import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home"; // will build later
import CreateAgent from "./pages/CreateAgent"; // placeholder
import Dashboard from "./pages/Dashboard"; // placeholder
import Marketplace from "./pages/Marketplace"; // placeholder
import AgentDetail from "./pages/AgentDetail"; // placeholder
import NotFound from "./pages/NotFound"; // placeholder
import WalletContextProvider from "./context/WalletContextProvider";

import "./index.css";
function App() {
  return (
    <WalletContextProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateAgent />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/agent/:address" element={<AgentDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </WalletContextProvider>
  );
}

export default App;
