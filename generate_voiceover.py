# generate_voiceover.py
import sys
import json
from gtts import gTTS
import os

# Print Python executable and path for debugging
print("Python executable:", sys.executable)
print("Python path:", sys.path)

# Read JSON from stdin
input_data = json.load(sys.stdin)

name = input_data["name"]
amount = input_data["amount"]
date = input_data["date"]
template = input_data["template"]
# Voiceover text
if template == "template1":
    text = f"Congratulations {name}! Your home loan of ${amount} has been Approved on {date}. Welcome."
else:
    text = f"Congratulations {name}! Your home loan of ${amount} has been completed on {date}. Congratulations."
# Generate the TTS (Text to Speech)
tts = gTTS(text=text, lang='en')

# Define the output path for the audio file
output_path = f"public/voiceovers/voiceover_{template}_{name}.mp3"

# Save the audio file
tts.save(output_path)

# Confirm the voiceover was saved
print(f"Voiceover saved to {output_path}")
