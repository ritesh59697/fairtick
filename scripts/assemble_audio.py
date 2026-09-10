import os
import subprocess

segments = [
    {"id": "seg_01", "start_ms": 800},
    {"id": "seg_02", "start_ms": 21000},
    {"id": "seg_03", "start_ms": 42500},
    {"id": "seg_04", "start_ms": 56000},
    {"id": "seg_05", "start_ms": 77000},
    {"id": "seg_06", "start_ms": 98000},
    {"id": "seg_07", "start_ms": 118000},
    {"id": "seg_08", "start_ms": 137500}
]

audio_dir = "/tmp/fairtick_audio"
inputs = []
filter_complex = []
mix_labels = []

for idx, s in enumerate(segments):
    filepath = os.path.join(audio_dir, f"{s['id']}.mp3")
    inputs.extend(["-i", filepath])
    filter_complex.append(f"[{idx}:a]adelay={s['start_ms']}|{s['start_ms']}[a{idx}]")
    mix_labels.append(f"[a{idx}]")

filter_complex_str = ";".join(filter_complex) + f";{''.join(mix_labels)}amix=inputs={len(segments)}:dropout_transition=0:normalize=0,volume=1.2[outa]"

out_master = os.path.join(audio_dir, "voiceover_master.wav")

cmd = [
    "ffmpeg", "-y",
    *inputs,
    "-filter_complex", filter_complex_str,
    "-map", "[outa]",
    "-c:a", "pcm_s16le",
    "-ar", "48000",
    out_master
]

print("Assembling master voiceover with exact timestamps...")
subprocess.run(cmd, check=True)

dur = float(subprocess.check_output([
    "ffprobe", "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    out_master
]).decode().strip())
print(f"Master voiceover generated: {out_master} (duration: {dur:.2f}s)")
