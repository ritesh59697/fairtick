def format_time(seconds):
    millis = int(round((seconds - int(seconds)) * 1000))
    total_seconds = int(seconds)
    secs = total_seconds % 60
    mins = (total_seconds // 60) % 60
    hours = total_seconds // 3600
    return f"{hours:02d}:{mins:02d}:{secs:02d},{millis:03d}"

subtitles = [
    # Scene 1: 0.8s - 20.5s
    (0.8, 4.0, "Welcome to FairTick —"),
    (4.0, 7.8, "the autonomous execution guardrail for onchain tokenized stocks on Base."),
    (7.8, 11.8, "As Coinbase brings institutional equities onchain via the B20 standard,"),
    (11.8, 15.8, "traders face real vulnerabilities: off-hours spread drift,"),
    (15.8, 20.5, "uncalibrated corporate stock splits, and predatory DEX markups."),

    # Scene 2: 21.0s - 42.0s
    (21.0, 25.5, "Standard DEX swaps execute blindly against AMM liquidity pools."),
    (25.5, 30.0, "FairTick introduces institutional-grade execution protection."),
    (30.0, 34.2, "We implement a hard 50-basis-point circuit breaker against official Chainlink equity prints,"),
    (34.2, 38.2, "continuous corporate stock split multiplier scaling,"),
    (38.2, 42.0, "and strictly zero residual allowance approvals."),

    # Scene 3: 42.5s - 55.5s
    (42.5, 46.8, "Connecting seamlessly through RainbowKit with Rabby Wallet on Base Mainnet."),
    (46.8, 50.8, "Notice FairTick's fail-closed edge compliance,"),
    (50.8, 55.5, "automatically verifying jurisdictional safety before generating any trade tickets."),

    # Scene 4: 56.0s - 76.5s
    (56.0, 60.5, "In the Markets Terminal, every B20 equity is benchmarked in real time."),
    (60.5, 65.0, "We open the protected trade ticket for NVDAc."),
    (65.0, 70.8, "FairTick immediately evaluates the Chainlink total-return feed at $223.56,"),
    (70.8, 76.5, "comparing it to the Uniswap V3 pool price to ensure the trade executes at fair value."),

    # Scene 5: 77.0s - 97.5s
    (77.0, 81.8, "Because US equity markets are closed, FairTick flags the held price feed"),
    (81.8, 86.8, "and requires explicit acknowledgement of after-hours spread risk."),
    (86.8, 91.8, "Entering 0.04 USDC, the router dynamically calculates the multiplier-scaled shares,"),
    (91.8, 97.5, "appending the Base ERC-8021 builder attribution code directly to the calldata."),

    # Scene 6: 98.0s - 117.5s
    (98.0, 102.8, "With a single click in Rabby, the transaction routes atomically"),
    (102.8, 107.5, "through Uniswap V3 SwapRouter02 on Base Mainnet."),
    (107.5, 112.5, "The trade is confirmed in sub-seconds. Our execution receipt confirms the exact shares received"),
    (112.5, 117.5, "at a 26-basis-point discount, complete with onchain builder attribution."),

    # Scene 7: 118.0s - 137.0s
    (118.0, 122.8, "Clicking through to Basescan, we see the live onchain receipt on Base Mainnet."),
    (122.8, 127.8, "Block 51108207 confirmed by the sequencer,"),
    (127.8, 132.5, "verifying the direct swap of 0.04 USDC into NVDAc"),
    (132.5, 137.0, "with zero hidden fees and no intermediary contract risk."),

    # Scene 8: 137.5s - 153.0s
    (137.5, 142.5, "Back on the FairTick terminal, users enjoy the full suite of Coinbase B20 tokenized stocks"),
    (142.5, 147.5, "with real-time Chainlink oracle health and institutional guardrails."),
    (147.5, 153.0, "FairTick — fair price discovery and oracle-protected execution on Base.")
]

srt_lines = []
for idx, (start, end, text) in enumerate(subtitles, 1):
    srt_lines.append(str(idx))
    srt_lines.append(f"{format_time(start)} --> {format_time(end)}")
    srt_lines.append(text)
    srt_lines.append("")

srt_content = "\n".join(srt_lines)

# Write to public/vid/fairtick.srt
out_path = "/Users/ritesh/.gemini/antigravity-ide/scratch/fairtick/public/vid/fairtick.srt"
with open(out_path, "w") as f:
    f.write(srt_content)

# Copy to Desktop for instant drag-and-drop into CapCut / Loom
desktop_path = "/Users/ritesh/Desktop/fairtick.srt"
with open(desktop_path, "w") as f:
    f.write(srt_content)

print(f"Generated {len(subtitles)} subtitle entries.")
print(f"Saved to {out_path} and {desktop_path}")
