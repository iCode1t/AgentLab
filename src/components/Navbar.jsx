// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import mascot from "../assets/mascot.png";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { publicKey } = useWallet();
  const [hasRedirected, setHasRedirected] = useState(false);

  // Redirect to dashboard only once, right after first connection
  useEffect(() => {
    if (publicKey && !hasRedirected && location.pathname === "/") {
      navigate("/dashboard");
      setHasRedirected(true);
    }
  }, [publicKey, hasRedirected, location, navigate]);

  return (
    <nav className="navbar">
      {/* Left Section - Logo */}
      <div className="nav-left">
        <Link to="/" className="logo">
          <div className="logo-wrapper">
            <img src={mascot} alt="AgentLab Mascot" className="logo-img" />
          </div>
          <span className="logo-text">AgentLab</span>
        </Link>
      </div>

      {/* Center Section - Nav Links */}
      <div className="nav-links">
        <Link to="/create">Create Agent</Link>
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      {/* Right Section - Wallet */}
      <div className="nav-right">
        <WalletMultiButton className="wallet-btn" />
      </div>
    </nav>
  );
};

export default Navbar;
