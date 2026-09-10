import asyncio
import os
import subprocess
import edge_tts

segments = [
    {
        "id": "seg_01",
        "start": 0.8,
        "text": "Welcome to FairTick — the autonomous execution guardrail for onchain tokenized stocks on Base. As Coinbase brings institutional equities onchain via the B20 standard, traders face real vulnerabilities: off-hours spread drift, uncalibrated corporate stock splits, and predatory DEX markups."
    },
    {
        "id": "seg_02",
        "start": 19.5,
        "text": "Standard DEX swaps execute blindly against AMM liquidity pools. FairTick introduces institutional-grade execution protection. We implement a hard 50-basis-point circuit breaker against official Chainlink equity prints, continuous corporate stock split multiplier scaling, and strictly zero residual allowance approvals."
    },
    {
        "id": "seg_03",
        "start": 40.0,
        "text": "Connecting seamlessly through RainbowKit with Rabby Wallet on Base Mainnet. Notice FairTick's fail-closed edge compliance, automatically verifying jurisdictional safety before generating any trade tickets."
    },
    {
        "id": "seg_04",
        "start": 53.0,
        "text": "In the Markets Terminal, every B20 equity is benchmarked in real time. We open the protected trade ticket for NVDAc. FairTick immediately evaluates the Chainlink total-return feed at 223 dollars and 56 cents, comparing it to the Uniswap V3 pool price to ensure the trade executes at fair value."
    },
    {
        "id": "seg_05",
        "start": 72.0,
        "text": "Because US equity markets are closed, FairTick flags the held price feed and requires explicit acknowledgement of after-hours spread risk. Entering 0.04 USDC, the router dynamically calculates the multiplier-scaled shares, appending the Base ERC-8021 builder attribution code directly to the calldata."
    },
    {
        "id": "seg_06",
        "start": 92.0,
        "text": "With a single click in Rabby, the transaction routes atomically through Uniswap V3 SwapRouter02 on Base Mainnet. The trade is confirmed in sub-seconds. Our execution receipt confirms the exact shares received at a 26-basis-point discount, complete with onchain builder attribution."
    },
    {
        "id": "seg_07",
        "start": 113.0,
        "text": "Clicking through to Basescan, we see the live onchain receipt on Base Mainnet. Block 51108207 confirmed by the sequencer, verifying the direct swap of 0.04 USDC into NVDAc with zero hidden fees and no intermediary contract risk."
    },
    {
        "id": "seg_08",
        "start": 133.5,
        "text": "Back on the FairTick terminal, users enjoy the full suite of Coinbase B20 tokenized stocks with real-time Chainlink oracle health and institutional guardrails. FairTick — fair price discovery and oracle-protected execution on Base."
    }
]

out_dir = "/tmp/fairtick_audio"
os.makedirs(out_dir, exist_ok=True)

async def synthesize():
    print("Generating voice segments with en-US-ChristopherNeural...")
    for s in segments:
        file_path = os.path.join(out_dir, s["id"] + ".mp3")
        comm = edge_tts.Communicate(s["text"], "en-US-ChristopherNeural", rate="+2%")
        await comm.save(file_path)
        dur = float(subprocess.check_output([
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            file_path
        ]).decode().strip())
        print(f"Segment {s['id']}: starts at {s['start']:.1f}s | duration: {dur:.2f}s | ends at {s['start'] + dur:.2f}s")

if __name__ == "__main__":
    asyncio.run(synthesize())
