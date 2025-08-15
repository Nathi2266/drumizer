from pydub import AudioSegment
import os
import random

def generate_drum_loop(samples_folder, generated_folder, pattern_settings, output_name="loop.wav"):
    """
    pattern_settings: dict with keys 'kick', 'shaker', 'perc'
    e.g., {'kick':4, 'shaker':8, 'perc':2}
    """
    kick_files = [f for f in os.listdir(samples_folder) if 'kick' in f.lower()]
    shaker_files = [f for f in os.listdir(samples_folder) if 'shaker' in f.lower()]
    perc_files = [f for f in os.listdir(samples_folder) if 'perc' in f.lower() or 'percussion' in f.lower()]

    loop_length_ms = 4000  # 4-second loop
    segment = AudioSegment.silent(duration=loop_length_ms)

    step_duration = loop_length_ms // 16  # 16-step sequencer

    def place_samples(base, files, step_interval):
        if not files or step_interval <= 0:
            return base
        for i in range(0, 16, step_interval):
            file_path = os.path.join(samples_folder, random.choice(files))
            file_seg = AudioSegment.from_wav(file_path)
            base = base.overlay(file_seg, position=i*step_duration)
        return base

    segment = place_samples(segment, kick_files, pattern_settings.get('kick', 4))
    segment = place_samples(segment, shaker_files, pattern_settings.get('shaker', 8))
    segment = place_samples(segment, perc_files, pattern_settings.get('perc', 2))

    output_path = os.path.join(generated_folder, output_name)
    segment.export(output_path, format='wav')
    return output_path
