# 🤖 AgentLab

AgentLab is a no-code platform for **creating and deploying on-chain agents** on Solana.  
These agents let communities **airdrop tokens, run votes, mint badges, or automate actions** — all without writing code.

Built for the **DevFun On-Chain App Jam**, AgentLab shows how anyone can spin up powerful token utilities in minutes.

---

## 🌟 Why AgentLab?

- **Problem:** Most Solana token communities struggle to add utility and engagement. Features like voting, airdrops, and gamified rewards require custom dev work.
- **Solution:** AgentLab provides **ready-made, composable agents** that anyone can deploy with a simple UI.

Agents are like **mini smart contracts** you can configure and launch instantly.

---

## 🛠️ Agent Types

1. **Distributor Agent**  
   Automatically reward holders with airdrops.  
   _Example: Distribute 10 $MEME to your first 100 holders every Friday._

2. **Voting Agent**  
   Token-weighted polls for community decisions.  
   _Example: “Which feature should we ship next? Option A vs Option B.”_

3. **Badge Agent**  
   Mint NFT badges based on conditions.  
   _Example: Award “Early Supporter” badge to anyone holding 1,000 tokens._

4. **Auto-Action Agent**  
   Automate token actions with triggers.  
   _Example: Burn 1% of supply if price drops below $0.01._

---

## 🚀 Features

- **No-Code Deployment**: Choose an agent, fill out a form, click deploy.
- **On-Chain Logic**: Agents execute real Solana transactions (airdrop, mint, vote).
- **Marketplace** (planned): Browse and fork existing agents from other communities.
- **Triggers**: Manual or automated execution.

---

## 📺 Demo

- Live App: [agentlab](https://agent-lab-five.vercel.app/)
- DevFun Listing: [dev.fun/app/agentlab](https://dev.fun/p/4139f9782d51f2c84cd6)

---

## ⚡ Status

Due to hackathon time limits, this MVP showcases the **full frontend experience**, with smart contract scaffolding in progress.  
The UI demonstrates how AgentLab will connect to Anchor programs for each agent type.

We believe this vision is **worthy of extension**: AgentLab can become a core tool for token communities to add utility instantly.

---

## 🛠️ Running Locally

```bash
git clone https://github.com/yourname/agentlab.git
cd agentlab
npm install
npm run dev
```
