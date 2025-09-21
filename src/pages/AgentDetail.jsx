import React from "react";
import { useParams } from "react-router-dom";

function AgentDetail() {
  const { address } = useParams();

  return (
    <div className="page-placeholder">
      <h2>Agent Detail</h2>
      <p>Details for agent: {address}</p>
    </div>
  );
}

export default AgentDetail;
