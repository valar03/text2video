# generate_voiceover.py
import sys
import json
print("Python executable:", sys.executable)
print("Python path:", sys.path)
from TTS.api import TTS

# Read JSON from stdin
input_data = json.load(sys.stdin)
name = input_data["name"]
amount = input_data["amount"]
date = input_data["date"]

# Voiceover text
text = f"Congratulations {name}! Your home loan of ${amount} has been approved on {date}. Welcome to your financial journey."

# Load TTS model
tts = TTS(model_name="tts_models/en/ljspeech/tacotron2-DDC", progress_bar=False, gpu=False)

# Output path
output_path = f"public/voiceovers/voiceover_{name}.wav"
tts.tts_to_file(text=text, file_path=output_path)

print(f" Voiceover saved to {output_path}")
