# FairTick — Institutional-Grade Trade Ticket for Tokenized Stocks on Base

<div align="center">

![FairTick Banner](https://fairtick.vercel.app/og-image.png)

### *“Don't overpay for onchain Apple.”*

[![Base Mainnet](https://img.shields.io/badge/Network-Base%20Mainnet%20(8453)-0052FF?logo=coinbase&logoColor=white)](https://basescan.org)
[![Chainlink Oracles](https://img.shields.io/badge/Oracles-Chainlink%20Total--Return-375BD2?logo=chainlink&logoColor=white)](https://data.chain.link)
[![Uniswap V3](https://img.shields.io/badge/DEX-Uniswap%20V3%20SwapRouter02-FF007A?logo=uniswap&logoColor=white)](https://app.uniswap.org)
[![ERC-8021](https://img.shields.io/badge/Attribution-ERC--8021%20Builder%20Code-00D395)](https://base.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Base Builder Quest: Tokenized Stocks Submission**

</div>

---

## 🔗 Quest Submission & Live Verification Links

| Resource | Link | Description |
| :--- | :--- | :--- |
| 🌐 **Live Web Application** | [fairtick.vercel.app](https://fairtick.vercel.app) | Production dApp deployed on Vercel with live Base Mainnet connectivity |
| 🐦 **Submission Tweet** | [x.com/Ritesh5969/...](https://x.com/Ritesh5969/status/2097883890925101411?s=20) | Official builder submission post with video demo breakdown |
| 🎥 **YouTube Video Walkthrough** | [youtu.be/_95142E07A4](https://youtu.be/_95142E07A4) | Complete audio-visual walkthrough of the interface and trade execution |
| 🔍 **Verified Onchain Transaction** | [Basescan `0x9bfb...ca252`](https://basescan.org/tx/0x9bfb2aa9ca0dfbdff5775b52c4de0e294686faa07c6c135db94963170e8ca252) | Live swap execution on Base Mainnet with verified ERC-8021 builder attribution |
| 💻 **Source Code Repository** | [github.com/ritesh59697/fairtick](https://github.com/ritesh59697/fairtick) | Open-source Next.js 16 + Wagmi v2 + Viem monorepo |

---

## 1. Executive Summary

### The Problem
Tokenized US stocks (Coinbase B20 tokens) trade **24/7** on Base decentralized exchanges like Uniswap V3 and Aerodrome. However, traditional US equity markets only operate **24/5** (9:30 AM – 4:00 PM EST) and pause during weekends, holidays, and circuit-breaker halts.

During off-market hours or thin liquidity regimes:
1. **DEX Price Dislocation**: Unsuspecting retail buyers regularly pay **200–500 bps premiums** over the underlying fair asset value.
2. **Stale Feeds & Flash Spikes**: Illiquid AMM pools fluctuate wildly while official benchmark feeds are frozen or held.
3. **Split Desynchronization**: Corporate stock splits alter the token-to-share multiplier, leading to misleading share quantity calculations in standard swap frontends.
4. **Infinite Allowance Vulnerabilities**: Naive swap tickets demand unlimited token approvals (`type(uint256).max`), permanently exposing user balances to frontrunning or smart contract risk.

### The Solution: FairTick
FairTick is an intelligent trade ticket and fairness gatekeeper built exclusively for Coinbase Tokenized Stocks on Base. It evaluates real-time onchain DEX pool mid-prices against official **Chainlink Total-Return equity feeds** with sub-minute staleness detection, enforces trade-exact token allowances, scales split multipliers transparently, and stamps every transaction with **ERC-8021 Builder Code attribution** (`bc_jmw5p5jt`).

---

## 2. Five Core Pillars of Protection

```
                                  [ USER INPUT ]
                                         │
                                         ▼
                     ┌───────────────────────────────────────┐
                     │         FAIRTICK SAFETY ENGINE        │
                     └───────────────────────────────────────┘
                                         │
        ┌───────────────────┬────────────┴────────────┬───────────────────┐
        ▼                   ▼                         ▼                   ▼
 1. Circuit Breaker  2. Split Multiplier      3. Zero Allowance    4. Attribution
    DEX vs Chainlink    Real Shares vs Token     Exact Approval       ERC-8021 Calldata
    Max 50 bps delta    Dynamic Scaling          No Trailing Bal      bc_jmw5p5jt
        │                   │                         │                   │
        └───────────────────┼─────────────────────────┼───────────────────┘
                            │ (All Checks Pass: GREEN)
                            ▼
              [ ATOMIC UNISWAP V3 EXECUTION ]
               SwapRouter02: 0x2626...41e481
```

1. **Hard 50 bps Circuit Breaker vs Chainlink**:
   - Continually pulls `latestRoundData()` directly from official Chainlink Base feeds.
   - Automatically calculates live premium/discount: `Premium = (DEX_Price - Chainlink_Price) / Chainlink_Price`.
   - Hard-locks the **Buy / Sell** button with an explanatory badge if the delta exceeds the user-configured limit (default: 50 bps) or if the oracle reports a stale round (>30 minutes during market hours).
2. **Continuous B20 Stock Split Multiplier Synchronization**:
   - 1 B20 token is not 1 share forever. In corporate split events (e.g. NVDA 10-for-1), tokens receive split multiplier adjustments.
   - FairTick reads the multiplier and displays exact token count alongside true underlying equity share count.
3. **Zero Residual Allowance (Trade-Exact Approvals)**:
   - Eliminates standard DeFi `MaxUint256` infinite allowance risk.
   - The trade ticket requests approval for *only the exact micro-unit USDC* needed for the impending swap, resetting residual risk to zero immediately upon execution.
4. **Atomic Uniswap V3 SwapRouter02 Execution**:
   - Executes through Base Uniswap V3 SwapRouter02 (`0x2626664c2603336E57B271c5C0b26F421741e481`).
   - Uses strict deadline parameters and minimum output bounds derived from real-time fair value.
5. **Base ERC-8021 Builder Attribution**:
   - Appends Base Builder Code (`bc_jmw5p5jt`) directly to the swap calldata suffix per the ERC-8021 standard, allowing verifiable onchain attribution without additional gas overhead.

---

## 3. Official Onchain Contracts & Data Feeds (Base Mainnet 8453)

All tokenized stocks and feeds supported by FairTick are deployed and verifiable on Base Mainnet:

| Asset Symbol | Asset Name | Token Address (B20 Precompile) | Chainlink Total-Return Feed | Primary Liquidity Venue |
| :--- | :--- | :--- | :--- | :--- |
| **NVDAc** | NVIDIA Corp | [`0xb20000000000000000000078ee7ce2fE4908108C`](https://basescan.org/token/0xb20000000000000000000078ee7ce2fE4908108C) | [`0x04689a41629776563E6822F76f2e57D148d28513`](https://basescan.org/address/0x04689a41629776563E6822F76f2e57D148d28513) | Aerodrome / Uniswap V3 |
| **AAPLc** | Apple Inc. | [`0xb200000000000000000000C2e324d24d7eEcd1fb`](https://basescan.org/token/0xb200000000000000000000C2e324d24d7eEcd1fb) | [`0x787f13dEa48Db0897CbCDD985de77809D837F988`](https://basescan.org/address/0x787f13dEa48Db0897CbCDD985de77809D837F988) | Uniswap V3 (`0x97F35d1E...`) |
| **METAc** | Meta Platforms | [`0xb2000000000000000000008bC8786B856E61707C`](https://basescan.org/token/0xb2000000000000000000008bC8786B856E61707C) | [`0x6526aE6797A76123638b863AeE4dD27Ba4E4b27D`](https://basescan.org/address/0x6526aE6797A76123638b863AeE4dD27Ba4E4b27D) | Uniswap V3 (`0x583919ec...`) |
| **GOOGLc** | Alphabet Inc. | [`0xb2000000000000000000002D0BA3164cc74f58B7`](https://basescan.org/token/0xb2000000000000000000002D0BA3164cc74f58B7) | [`0x5bF49E0ffA937CE2FfF033c739aD7C634c4D34F2`](https://basescan.org/address/0x5bF49E0ffA937CE2FfF033c739aD7C634c4D34F2) | Uniswap V3 (`0x8634EE41...`) |
| **TSLAc** | Tesla Inc. | [`0xb2000000000000000000001e800a7f5189430cD0`](https://basescan.org/token/0xb2000000000000000000001e800a7f5189430cD0) | [`0xFaf869185383a24F8cb00e27BdA6b63B9905DCb4`](https://basescan.org/address/0xFaf869185383a24F8cb00e27BdA6b63B9905DCb4) | Uniswap V3 |
| **MSFTc** | Microsoft Corp | [`0xb200000000000000000000Ab99cFa739E253872B`](https://basescan.org/token/0xb200000000000000000000Ab99cFa739E253872B) | [`0xeB10A6c9aa7E537aEd766C08c35Dae35B321b18c`](https://basescan.org/address/0xeB10A6c9aa7E537aEd766C08c35Dae35B321b18c) | Uniswap V3 |

- **Quote Settlement Asset**: Native USDC on Base (`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`)
- **DEX Router**: Uniswap V3 SwapRouter02 (`0x2626664c2603336E57B271c5C0b26F421741e481`)
- **Attribution Identifier**: `bc_jmw5p5jt`

---

## 4. Technology Stack & Architecture

- **Frontend Framework**: Next.js 16 (Turbopack, App Router, React 19)
- **Web3 Interaction**: Wagmi v2, Viem, RainbowKit, TanStack React Query
- **Oracles & Feeds**: Chainlink AggregatorV3Interface contracts on Base
- **DEX Integration**: Uniswap V3 SwapRouter02 exact-input single-hop execution
- **Compliance & Geo-Fencing**: Cloudflare/Vercel IP edge geolocation (`/api/geo`) with auto-rejection of restricted jurisdictions per token issuance rules
- **Styling & Motion**: Custom dark glassmorphism design system, responsive HUD telemetry, Framer Motion

---

## 5. Local Development Setup

### Prerequisites
- Node.js >= 18.18.0
- npm >= 9.0.0

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/ritesh59697/fairtick.git
cd fairtick

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build & Typecheck
```bash
npm run build
```

---

## 6. Onchain Verification Receipt

Every trade executed via FairTick generates an immutable receipt on Base Mainnet. Example verified transaction:

- **Transaction Hash**: [`0x9bfb2aa9ca0dfbdff5775b52c4de0e294686faa07c6c135db94963170e8ca252`](https://basescan.org/tx/0x9bfb2aa9ca0dfbdff5775b52c4de0e294686faa07c6c135db94963170e8ca252)
- **Network**: Base Mainnet (Chain ID: 8453)
- **From**: `0xcF649B2497bBAbE89410118D6855193B60408B1f`
- **Interacted With (To)**: Uniswap V3 SwapRouter02 (`0x2626664c2603336E57B271c5C0b26F421741e481`)
- **Attribution Suffix**: `bc_jmw5p5jt` (appended to input data)
- **Status**: Success

---

## 7. Compliance & Regulatory Notice

FairTick is a decentralized interface providing analytics, price benchmarking, and routing assistance for existing tokenized stocks issued on Base. FairTick is not a broker-dealer, does not custody funds, does not issue securities, and does not conduct transactions on behalf of users. Tokenized stocks (B20 tokens) are issued by Coinbase Financial Markets / third-party issuers and are strictly restricted to eligible non-US persons. US persons and restricted jurisdictions are blocked via automated geo-fence controls.
