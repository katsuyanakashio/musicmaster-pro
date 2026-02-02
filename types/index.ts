export interface Note {
  id: string;
  note: string;
  octave: number;
  time: number;
  duration: number;
  velocity: number;
}

export interface FallingNote extends Note {
  y: number;
  active: boolean;
  hit: boolean;
}

export interface KeyboardKey {
  note: string;
  octave: number;
  isBlack: boolean;
  position: number;
}

export interface MetronomeState {
  bpm: number;
  isPlaying: boolean;
  currentBeat: number;
  beatsPerMeasure: number;
  color: string;
}

export interface GameState {
  score: number;
  combo: number;
  perfect: number;
  good: number;
  miss: number;
  accuracy: number;
}