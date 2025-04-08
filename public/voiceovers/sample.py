from TTS.api import TTS

tts = TTS(model_name="tts_models/en/ljspeech/tacotron2-DDC", progress_bar=False, gpu=False)
tts.tts_to_file(text="Hi! Your loan has been approved!", file_path="test.wav")
