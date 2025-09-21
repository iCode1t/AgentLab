import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Vote, Medal, RefreshCcw } from "lucide-react";
const agents = [
  {
    id: "distributor",
    icon: <Gift className="agent-icon" />,
    title: "Distributor Agent",
    subtitle: "Reward your holders with automated airdrops",
  },
  {
    id: "voting",
    icon: <Vote className="agent-icon" />,
    title: "Voting Agent",
    subtitle: "Token-weighted polls for communities",
  },
  {
    id: "badge",
    icon: <Medal className="agent-icon" />,
    title: "Badge Agent",
    subtitle: "Mint NFT badges for achievements",
  },
  {
    id: "auto",
    icon: <RefreshCcw className="agent-icon" />,
    title: "Auto-Action Agent",
    subtitle: "Automate token actions on triggers",
  },
];

const Create = () => {
  const [selectedAgent, setSelectedAgent] = useState(null);

  const openModal = (agent) => setSelectedAgent(agent);
  const closeModal = () => setSelectedAgent(null);

  return (
    <div className="create-page">
      <h1 className="create-title">Choose Your Agent</h1>

      {/* Grid of Agent Cards */}
      <div className="agent-grid">
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            className="agent-card"
            whileHover={{ scale: 1.05 }}
          >
            <div className="agent-icon">{agent.icon}</div>
            <h2>{agent.title}</h2>
            <p>{agent.subtitle}</p>
            <button className="select-btn" onClick={() => openModal(agent)}>
              Select
            </button>
          </motion.div>
        ))}
      </div>

      {/* Config Form Modal */}
      {selectedAgent && (
        <div className="modal-overlay" onClick={closeModal}>
          <motion.div
            className="modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">{selectedAgent.title}</h2>
            <div className="modal-form">
              {selectedAgent.id === "distributor" && (
                <>
                  <label>Token Address</label>
                  <input type="text" placeholder="Enter token address" />

                  <label>Amount per User</label>
                  <input type="number" placeholder="10" />

                  <label>Max Recipients</label>
                  <input type="number" placeholder="100" />

                  <label>Trigger</label>
                  <select>
                    <option>Manual</option>
                    <option>Auto</option>
                  </select>
                </>
              )}

              {selectedAgent.id === "voting" && (
                <>
                  <label>Question</label>
                  <input type="text" placeholder="What should we build next?" />

                  <label>Options</label>
                  <input type="text" placeholder="Option A, Option B, ..." />

                  <label>Voting Duration (hours)</label>
                  <input type="number" placeholder="24" />
                </>
              )}

              {selectedAgent.id === "badge" && (
                <>
                  <label>Badge Name</label>
                  <input type="text" placeholder="Early Supporter" />

                  <label>Description</label>
                  <textarea placeholder="Awarded to users who..." />

                  <label>Condition</label>
                  <input type="text" placeholder="Hold 100 tokens" />

                  <label>Badge Icon</label>
                  <input type="file" accept="image/*" />
                </>
              )}

              {selectedAgent.id === "auto" && (
                <>
                  <label>Token Address</label>
                  <input type="text" placeholder="Enter token address" />

                  <label>Action</label>
                  <select>
                    <option>Buy</option>
                    <option>Sell</option>
                    <option>Burn</option>
                    <option>Transfer</option>
                  </select>

                  <label>Condition</label>
                  <input type="text" placeholder="Price < $0.01" />

                  <label>Trigger</label>
                  <select>
                    <option>Manual</option>
                    <option>Condition-based</option>
                  </select>
                </>
              )}
            </div>
            <div className="modal-actions">
              <button className="close-btn" onClick={closeModal}>
                Cancel
              </button>
              <button className="deploy-btn">Deploy Agent</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Create;
