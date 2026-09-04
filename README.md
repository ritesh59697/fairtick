# FairTick — Trade Ticket for Coinbase Tokenized Stocks on Base
> **Base Builder Quest: Tokenized Stocks** | Deadline: Sept 9, 2026 11:59pm EST  
> Tagline: *“Don’t overpay for onchain Apple.”*

---

## 1. Executive Summary
FairTick is an intelligent trade ticket and fairness gatekeeper built exclusively for **Coinbase Tokenized Stocks (B20)** on Base. 

### The Problem
Tokenized stocks trade 24/7 on Base decentralized exchanges (Aerodrome, Uniswap V3). However, official equity price feeds are 24/5 and freeze during after-hours, weekends, or corporate split actions. Naive swap interfaces let unsuspecting retail buyers pay 2%+ rich DEX premiums or execute against frozen, stale feeds.

### The Solution
FairTick evaluates real-time onchain DEX mid-prices against official **Chainlink Total-Return feeds** with sub-minute staleness detection and multiplier-aware arithmetic. It disables the Buy/Sell button whenever execution is unsafe and attaches **ERC-8021 Builder Code attribution** to every executed transaction.

---

## 2. Technical Architecture & Innovation
1. **Chainlink Tokenized-Equity V3 Feeds**: Directly queries official feeds (e.g. `NVDA: 0x0468...`, `AAPL: 0x787f...`). Incorporates 30-minute staleness checks during regular market hours and manages after-hours "FEED HELD" risk overrides.
2. **Multiplier-Aware Arithmetic**: 1 B20 token $\neq$ 1 share forever due to corporate stock splits. FairTick displays raw token units alongside scaled share count. Because Chainlink total-return feeds already fold in the multiplier, our pricing engine directly benchmarks DEX prices without duplicate multiplier math.
3. **Safety Gatekeeper Engine**:
   - **Geo-Fence Gate**: Rejects US persons (`/api/geo`).
   - **Feed Status Gate**: Blocks when feed is STALE or FROZEN.
   - **Premium Cap Gate**: Automatically disables swaps if DEX price is richer or cheaper than the user's max tolerance (default: 50 bps).
   - **Liquidity / Impact Gate**: Warns if price impact exceeds 150 bps.
4. **Attribution**: Appends `NEXT_PUBLIC_BUILDER_CODE` dataSuffix to every swap transaction.

---

## 3. Official Onchain Addresses (Base Mainnet 8453)

| Symbol | Name | Token Address (B20 Precompile) | Chainlink Total-Return Feed | Primary DEX Pool |
| :--- | :--- | :--- | :--- | :--- |
| **NVDAc** | NVIDIA Corporation | `0xb20000000000000000000078ee7ce2fE4908108C` | `0x04689a41629776563E6822F76f2e57D148d28513` | Aerodrome V2 (`0x2e39A901...`) |
| **AAPLc** | Apple Inc. | `0xb200000000000000000000C2e324d24d7eEcd1fb` | `0x787f13dEa48Db0897CbCDD985de77809D837F988` | Uniswap V3 (`0x97F35d1E...`) |
| **METAc** | Meta Platforms Inc. | `0xb2000000000000000000008bC8786B856E61707C` | `0x6526aE6797A76123638b863AeE4dD27Ba4E4b27D` | Uniswap V3 (`0x583919ec...`) |
| **GOOGLc** | Alphabet Inc. | `0xb2000000000000000000002D0BA3164cc74f58B7` | `0x5bF49E0ffA937CE2FfF033c739aD7C634c4D34F2` | Uniswap V3 (`0x8634EE41...`) |
| **TSLAc** | Tesla Inc. | `0xb2000000000000000000001e800a7f5189430cD0` | `0xFaf869185383a24F8cb00e27BdA6b63B9905DCb4` | Uniswap V3 |
| **MSFTc** | Microsoft Corporation | `0xb200000000000000000000Ab99cFa739E253872B` | `0xeB10A6c9aa7E537aEd766C08c35Dae35B321b18c` | Uniswap V3 |

*Quote Asset: USDC on Base (`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`)*

---

## 4. Setup & Running Locally

### Prerequisites
- Node.js >= 18
- npm

### Installation
```bash
# Clone and enter directory
cd fairtick

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

---

## 5. Loom Demo Video Script (~2:20)

- **0:00 - 0:20 | The Problem**:
  > *"Tokenized stocks on Base trade 24/7. Official equity feeds do not. Today, unsuspecting users overpay by buying Apple or Nvidia when DEX pools sit rich or when feeds freeze during after-hours."*
- **0:20 - 0:40 | The Fairness Dashboard**:
  > *"Enter FairTick: 'Don’t overpay for onchain Apple'. Here on our market list, you see real-time DEX mid-prices, Chainlink total-return feeds, and the premium in basis points. Notice the LIVE / HELD / STALE pills."*
- **0:40 - 1:00 | The Ticket & Force Stale Demo**:
  > *"Let's open NVDAc. You see the multiplier calculation—1 token isn't 1 share forever. We set our max premium to 50 bps. Watch what happens if we toggle 'Demo Stale Feed': the swap button immediately locks with an explicit warning."*
- **1:00 - 1:25 | Protected Execution**:
  > *"We flip back to live feed. The trade is certified safe. We enter 10 USDC, confirm the swap on Base with ERC-8021 Builder Code attribution, and execute."*
- **1:25 - 1:50 | The Receipt**:
  > *"Here is the receipt screen: tx hash, verified contract address, tokens received, and exact scaled share count. You can 1-click share this protected trade on X."*
- **1:50 - 2:05 | Geo-Fencing & Policy**:
  > *"Notice the top compliance bar: US users are automatically blocked from trading per Coinbase terms. Only eligible non-US persons can execute."*
- **2:05 - 2:20 | Summary**:
  > *"FairTick turns onchain equities into institutional-grade, protected trading primitives on Base. Built for the Base Builder Quest."*

---

## 6. Legal Disclaimer
FairTick is a demo interface for existing Coinbase Tokenized Stocks (B20) on Base. It is not a broker-dealer, not an offer of securities, and not available to US persons. Tokenized stocks are issued by Coinbase and only available to eligible users in permitted non-US jurisdictions. Do your own research. Base / FairTick does not issue these tokens.
