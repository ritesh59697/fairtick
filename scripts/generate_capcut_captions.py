import os
import shutil
import subprocess
from PIL import Image, ImageDraw, ImageFont

W, H = 2940, 1652
WHITE = (255, 255, 255, 255)
CYAN = (56, 189, 248, 255)       # Tailwind Sky-400
YELLOW = (250, 204, 21, 255)     # Tailwind Yellow-400
GREEN = (74, 222, 128, 255)      # Tailwind Green-400
RED = (248, 113, 113, 255)       # Tailwind Red-400

font_path = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
font = ImageFont.truetype(font_path, 58)

out_dir = "/tmp/capcut_cards"
os.makedirs(out_dir, exist_ok=True)

# 32 timed CapCut cards
cards = [
    # Seg 1: 0.8 -> 20.5
    {"id": "c01", "dur": 3.0, "parts": [("WELCOME TO ", WHITE), ("FAIRTICK", CYAN)]},
    {"id": "c02", "dur": 3.7, "parts": [("AUTONOMOUS GUARDRAIL FOR ", WHITE), ("TOKENIZED STOCKS", YELLOW)]},
    {"id": "c03", "dur": 4.0, "parts": [("PURPOSE-BUILT FOR ", WHITE), ("COINBASE B20 ON BASE", CYAN)]},
    {"id": "c04", "dur": 4.0, "parts": [("TRADERS FACE ", WHITE), ("OFF-HOURS SPREAD DRIFT", RED)]},
    {"id": "c05", "dur": 5.0, "parts": [("UNCALIBRATED SPLITS & ", WHITE), ("PREDATORY MARKUPS", RED)]},
    {"id": "gap1", "dur": 0.5, "parts": []},

    # Seg 2: 21.0 -> 42.0
    {"id": "c06", "dur": 4.0, "parts": [("STANDARD DEX SWAPS ", WHITE), ("EXECUTE BLINDLY", RED)]},
    {"id": "c07", "dur": 4.5, "parts": [("FAIRTICK INTRODUCES ", WHITE), ("INSTITUTIONAL PROTECTION", CYAN)]},
    {"id": "c08", "dur": 4.5, "parts": [("HARD 50 BPS ", GREEN), ("CIRCUIT BREAKER", CYAN)]},
    {"id": "c09", "dur": 4.0, "parts": [("CONTINUOUS ", WHITE), ("STOCK SPLIT MULTIPLIER SYNC", CYAN)]},
    {"id": "c10", "dur": 4.0, "parts": [("STRICTLY ", WHITE), ("ZERO RESIDUAL ALLOWANCE", GREEN)]},
    {"id": "gap2", "dur": 0.5, "parts": []},

    # Seg 3: 42.5 -> 55.5
    {"id": "c11", "dur": 4.0, "parts": [("CONNECTING WITH ", WHITE), ("RABBY WALLET", CYAN)]},
    {"id": "c12", "dur": 4.0, "parts": [("SEAMLESS ACCESS ON ", WHITE), ("BASE MAINNET", YELLOW)]},
    {"id": "c13", "dur": 5.0, "parts": [("FAIL-CLOSED ", GREEN), ("EDGE JURISDICTION COMPLIANCE", CYAN)]},
    {"id": "gap3", "dur": 0.5, "parts": []},

    # Seg 4: 56.0 -> 76.5
    {"id": "c14", "dur": 4.5, "parts": [("REAL-TIME BENCHMARKS FOR ", WHITE), ("EVERY B20 ASSET", CYAN)]},
    {"id": "c15", "dur": 4.5, "parts": [("OPENING PROTECTED TRADE FOR ", WHITE), ("NVDAC", GREEN)]},
    {"id": "c16", "dur": 5.5, "parts": [("CHAINLINK EQUITY PRINT: ", WHITE), ("$223.56", CYAN)]},
    {"id": "c17", "dur": 6.0, "parts": [("CHECKING UNISWAP POOL FOR ", WHITE), ("FAIR VALUE", GREEN)]},
    {"id": "gap4", "dur": 0.5, "parts": []},

    # Seg 5: 77.0 -> 97.5
    {"id": "c18", "dur": 4.5, "parts": [("FEED HELD: ", YELLOW), ("US MARKET CLOSED", WHITE)]},
    {"id": "c19", "dur": 5.0, "parts": [("EXPLICIT ACKNOWLEDGEMENT OF ", WHITE), ("AFTER-HOURS RISK", YELLOW)]},
    {"id": "c20", "dur": 5.0, "parts": [("ENTERING ", WHITE), ("0.04 USDC", GREEN), (" TRADE", WHITE)]},
    {"id": "c21", "dur": 6.0, "parts": [("APPENDING BASE ", WHITE), ("ERC-8021 BUILDER CODE", CYAN)]},
    {"id": "gap5", "dur": 0.5, "parts": []},

    # Seg 6: 98.0 -> 117.5
    {"id": "c22", "dur": 4.5, "parts": [("ONE-CLICK ROUTING VIA ", WHITE), ("SWAPROUTER02", CYAN)]},
    {"id": "c23", "dur": 5.0, "parts": [("TRANSACTION SIGNED & ", WHITE), ("SUB-SECOND EXECUTION", GREEN)]},
    {"id": "c24", "dur": 5.0, "parts": [("EXECUTION AT ", WHITE), ("-26 BPS DISCOUNT", GREEN)]},
    {"id": "c25", "dur": 5.0, "parts": [("VERIFIED ONCHAIN ", WHITE), ("BUILDER ATTRIBUTION", CYAN)]},
    {"id": "gap6", "dur": 0.5, "parts": []},

    # Seg 7: 118.0 -> 137.0
    {"id": "c26", "dur": 4.5, "parts": [("LIVE ONCHAIN RECEIPT ON ", WHITE), ("BASESCAN", CYAN)]},
    {"id": "c27", "dur": 5.0, "parts": [("BLOCK 51108207 ", WHITE), ("CONFIRMED BY SEQUENCER", GREEN)]},
    {"id": "c28", "dur": 5.0, "parts": [("DIRECT SWAP OF ", WHITE), ("0.04 USDC TO NVDAC", GREEN)]},
    {"id": "c29", "dur": 4.5, "parts": [("ZERO HIDDEN FEES & ", WHITE), ("NO MIDDLEMAN RISK", GREEN)]},
    {"id": "gap7", "dur": 0.5, "parts": []},

    # Seg 8: 137.5 -> 153.0
    {"id": "c30", "dur": 5.0, "parts": [("FULL SUITE OF ", WHITE), ("COINBASE B20 EQUITIES", CYAN)]},
    {"id": "c31", "dur": 5.0, "parts": [("REAL-TIME ", WHITE), ("CHAINLINK ORACLE HEALTH", CYAN)]},
    {"id": "c32", "dur": 5.5, "parts": [("FAIRTICK: ", CYAN), ("ORACLE-PROTECTED EXECUTION ON BASE", YELLOW)]},
    {"id": "c_end", "dur": 0.9, "parts": []}
]

blank_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
blank_img.save(os.path.join(out_dir, "blank.png"))

def render_card(card):
    if not card["parts"]:
        return "blank.png"
    
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    total_w = 0
    max_h = 0
    part_boxes = []
    for text, color in card["parts"]:
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        h = bbox[3] - bbox[1]
        part_boxes.append((w, h))
        total_w += w
        max_h = max(max_h, h)

    pad_x = 44
    pad_y = 22
    pill_w = total_w + pad_x * 2
    pill_h = max_h + pad_y * 2
    pill_x = (W - pill_w) // 2
    pill_y = 1355

    # Drop shadow
    for offset in [4, 6, 8]:
        draw.rounded_rectangle(
            [pill_x, pill_y + offset, pill_x + pill_w, pill_y + pill_h + offset],
            radius=28,
            fill=(0, 0, 0, 90)
        )

    # Translucent glass pill badge with border
    draw.rounded_rectangle(
        [pill_x, pill_y, pill_x + pill_w, pill_y + pill_h],
        radius=28,
        fill=(10, 15, 29, 235),
        outline=(56, 189, 248, 160),
        width=3
    )

    # Draw text parts with subtle black shadow
    cur_x = pill_x + pad_x
    text_y = pill_y + pad_y - 2
    for (text, color), (w, h) in zip(card["parts"], part_boxes):
        draw.text((cur_x + 2, text_y + 2), text, font=font, fill=(0, 0, 0, 220))
        draw.text((cur_x, text_y), text, font=font, fill=color)
        cur_x += w

    fname = f"{card['id']}.png"
    img.save(os.path.join(out_dir, fname))
    return fname

# Initial 0.8s blank
concat_lines = ["ffconcat version 1.0", "file blank.png", "duration 0.8"]

for c in cards:
    fname = render_card(c)
    concat_lines.append(f"file {fname}")
    concat_lines.append(f"duration {c['dur']}")

concat_lines.append("file blank.png")

concat_file = os.path.join(out_dir, "captions.txt")
with open(concat_file, "w") as f:
    f.write("\n".join(concat_lines) + "\n")

print(f"Generated {len(cards)} CapCut caption cards and ffconcat script at {concat_file}")

# Burn captions into video using hardware-accelerated overlay
raw_vid = "/Users/ritesh/.gemini/antigravity-ide/scratch/fairtick/public/vid/fairtick.mp4"
final_with_captions = "/Users/ritesh/.gemini/antigravity-ide/scratch/fairtick/public/vid/fairtick_with_captions.mp4"

cmd = [
    "ffmpeg", "-y",
    "-i", raw_vid,
    "-f", "concat", "-safe", "0", "-i", concat_file,
    "-filter_complex", "[0:v][1:v]overlay=0:0[outv]",
    "-map", "[outv]",
    "-map", "0:a:0",
    "-c:v", "h264_videotoolbox",
    "-b:v", "6500k",
    "-c:a", "copy",
    "-movflags", "+faststart",
    final_with_captions
]

print("Burning CapCut captions into demo video...")
subprocess.run(cmd, check=True)
print("Video with captions successfully generated at:", final_with_captions)

# Update fairtick.mp4 and Desktop upload file as well
shutil.copy2(final_with_captions, raw_vid)
desktop_path = "/Users/ritesh/Desktop/FairTick_Demo_Loom.mp4"
shutil.copy2(final_with_captions, desktop_path)
print("Updated fairtick.mp4 and Desktop/FairTick_Demo_Loom.mp4 with CapCut captions!")
