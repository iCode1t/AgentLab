import React from "react";
import { Hammer, Zap, GitFork } from "lucide-react";
import { Link } from "react-router-dom";
import mascot from "../assets/mascot.png"; // use your uploaded mascot here

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-mascot-wrapper">
          <img src={mascot} alt="AgentLab Mascot" className="mascot-img" />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            Create, fork, and run on-chain agents in minutes.
          </h1>
          <p>
            Power your web3 vision with Solana. Deploy a digital life with
            blazing speed and near-zero fees.
          </p>
          <Link to="/create" className="hero-cta">
            Launch AgentLab
          </Link>
        </div>
      </section>

      {/* Explainer Grid */}
      <section className="explainer">
        <div className="explainer-card">
          <Hammer size={40} className="card-icon" />
          <h3 className="card-title">Create</h3>
          <p className="card-text">Build agent rules and deploy instantly.</p>
        </div>
        <div className="explainer-card">
          <Zap size={40} className="card-icon" />
          <h3 className="card-title">Trigger</h3>
          <p className="card-text">Run on-chain actions seamlessly.</p>
        </div>
        <div className="explainer-card">
          <GitFork size={40} className="card-icon" />
          <h3 className="card-title">Fork</h3>
          <p className="card-text">
            Remix agents directly from the marketplace.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
