import * as Tone from 'tone';

class AudioEngine {
  private synth: Tone.PolySynth | null = null;
  private metronome: Tone.MetalSynth | null = null;
  private initialized = false;

  async init() {
    if (this.initialized) return;

    await Tone.start();

    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: 'triangle',
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
      },
    }).toDestination();

    this.metronome = new Tone.MetalSynth({
      frequency: 800,
      envelope: {
        attack: 0.001,
        decay: 0.1,
        release: 0.01,
      },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5,
    }).toDestination();

    this.initialized = true;
  }

  playNote(note: string, octave: number, duration: string = '8n', velocity: number = 0.8) {
    if (!this.synth) return;

    const fullNote = `${note}${octave}`;
    this.synth.triggerAttackRelease(fullNote, duration, undefined, velocity);
  }

  playChord(notes: string[], duration: string = '8n') {
    if (!this.synth) return;

    this.synth.triggerAttackRelease(notes, duration);
  }

  playMetronomeBeat(isAccent: boolean = false) {
    if (!this.metronome) return;

    const frequency = isAccent ? 1000 : 800;
    this.metronome.frequency.value = frequency;
    this.metronome.triggerAttackRelease('16n');
  }

  stopAll() {
    if (this.synth) {
      this.synth.releaseAll();
    }
  }

  dispose() {
    if (this.synth) {
      this.synth.dispose();
    }
    if (this.metronome) {
      this.metronome.dispose();
    }
    this.initialized = false;
  }
}

export const audioEngine = new AudioEngine();