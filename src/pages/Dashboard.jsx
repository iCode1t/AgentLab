// src/pages/Dashboard.jsx
import React, { useEffect, useRef, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Link } from "react-router-dom";

/**
 * Best-effort network detection:
 * 1) Try provider hints (window.solana.network / _network / rpcEndpoint)
 * 2) Else probe devnet/testnet/mainnet in parallel with a short timeout
 *    - prefer the cluster that returns a non-zero balance
 *    - if all zero, prefer the first cluster that responded successfully
 */

const CLUSTER_RPC = {
  devnet: "https://api.devnet.solana.com",
  testnet: "https://api.testnet.solana.com",
  "mainnet-beta": "https://api.mainnet-beta.solana.com",
};

const CLUSTERS = ["devnet", "testnet", "mainnet-beta"];

/** helper: small timeout wrapper for getBalance */
function getBalanceWithTimeout(connection, publicKey, ms = 2500) {
  return new Promise((resolve, reject) => {
    let done = false;
    const timer = setTimeout(() => {
      if (!done) {
        done = true;
        reject(new Error("timeout"));
      }
    }, ms);

    connection
      .getBalance(publicKey)
      .then((bal) => {
        if (!done) {
          done = true;
          clearTimeout(timer);
          resolve(bal);
        }
      })
      .catch((err) => {
        if (!done) {
          done = true;
          clearTimeout(timer);
          reject(err);
        }
      });
  });
}

/** normalize possible provider network strings */
function normalizeNetworkString(s) {
  if (!s || typeof s !== "string") return null;
  const v = s.toLowerCase();
  if (v.includes("dev")) return "devnet";
  if (v.includes("test")) return "testnet";
  if (v.includes("main")) return "mainnet-beta";
  return null;
}

export default function Dashboard() {
  const { publicKey, wallet } = useWallet();
  const [balance, setBalance] = useState(null);
  const [cluster, setCluster] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | detecting | ready | error
  const detectId = useRef(0);

  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      setCluster(null);
      setStatus("idle");
      return;
    }

    let localDetectId = ++detectId.current;
    setStatus("detecting");

    const tryDetect = async () => {
      try {
        // 1) Provider hints (window.solana)
        if (typeof window !== "undefined" && window.solana) {
          const prov = window.solana;
          const possible =
            prov.network ||
            prov._network ||
            prov.rpcEndpoint ||
            prov._rpcEndpoint ||
            prov._cluster;
          const normalized = normalizeNetworkString(possible);
          if (normalized) {
            // attempt to read balance from normalized cluster
            const conn = new Connection(CLUSTER_RPC[normalized], "confirmed");
            try {
              const lamports = await getBalanceWithTimeout(
                conn,
                publicKey,
                3000
              );
              if (detectId.current === localDetectId) {
                setCluster(normalized);
                setBalance(lamports / LAMPORTS_PER_SOL);
                setStatus("ready");
                return;
              }
            } catch (err) {
              // provider hinted a network but RPC call failed -> fall through to probing
              console.warn(
                "Provider hint network detected but RPC fetch failed:",
                err
              );
            }
          }
        }

        // 2) Probe clusters in parallel (best-effort)
        const probes = CLUSTERS.map(async (c) => {
          const conn = new Connection(CLUSTER_RPC[c], "confirmed");
          try {
            const lamports = await getBalanceWithTimeout(conn, publicKey, 2500);
            return { cluster: c, lamports, ok: true };
          } catch (err) {
            return {
              cluster: c,
              lamports: null,
              ok: false,
              error: err.message || err.toString(),
            };
          }
        });

        const results = await Promise.all(probes);

        if (detectId.current !== localDetectId) return; // stale

        const successful = results.filter((r) => r.ok);
        if (successful.length === 0) {
          // nothing responded (network issues) -> fallback mainnet
          setCluster("mainnet-beta");
          setBalance(null);
          setStatus("error");
          console.warn(
            "No cluster responded when probing for balance:",
            results
          );
          return;
        }

        // prefer clusters with non-zero balances
        const nonZero = successful.filter((r) => (r.lamports || 0) > 0);
        let chosen;
        if (nonZero.length > 0) {
          // choose the one with highest balance (most likely the active network)
          chosen = nonZero.reduce((a, b) => (a.lamports > b.lamports ? a : b));
        } else {
          // all zero balances — choose the first successful responder (best-effort)
          chosen = successful[0];
        }

        setCluster(chosen.cluster);
        setBalance((chosen.lamports || 0) / LAMPORTS_PER_SOL);
        setStatus("ready");
      } catch (err) {
        console.error("Network detection failed:", err);
        setCluster("mainnet-beta");
        setBalance(null);
        setStatus("error");
      }
    };

    tryDetect();

    // cleanup not required beyond detectId guard
  }, [publicKey, wallet]);

  if (!publicKey) {
    return (
      <div className="dashboard">
        <h2>Please connect your wallet to view your dashboard.</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Your Dashboard</h1>

      <p>
        <strong>Wallet:</strong> {publicKey.toBase58().slice(0, 6)}...
        {publicKey.toBase58().slice(-6)}
      </p>

      <p>
        <strong>Cluster:</strong>{" "}
        {cluster
          ? cluster
          : status === "detecting"
          ? "detecting..."
          : "unknown"}
      </p>

      <p>
        <strong>SOL Balance:</strong>{" "}
        {status === "detecting"
          ? "Detecting..."
          : balance !== null
          ? `${Number(balance).toFixed(6)} SOL`
          : "n/a"}
      </p>

      {/* Call-to-Action Section */}
      <div className="cta-section">
        <h2>No agents yet!</h2>
        <p>
          Get started by creating your first agent or exploring the marketplace.
        </p>
        <div className="cta-buttons">
          <Link to="/create" className="cta-btn">
            Create Agent
          </Link>
          <Link to="/marketplace" className="cta-btn">
            Explore Marketplace
          </Link>
        </div>
      </div>

      {/* Placeholder Agents List */}
      <div className="agents-list">
        <h2>Your Agents</h2>
        <p>
          No agents found. Once you create or fork an agent, it will appear
          here.
        </p>
      </div>
    </div>
  );
}
