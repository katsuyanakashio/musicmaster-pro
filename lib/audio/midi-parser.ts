import { Note } from '@/types';

export function parseMidiData(midiData: string): Note[] {
  // 簡易的なMIDIパーサー（実際のプロジェクトではライブラリを使用）
  const notes: Note[] = [];
  
  // サンプルデータ: "C4:0:500,E4:500:500,G4:1000:500"
  // フォーマット: "note:time:duration"
  const noteStrings = midiData.split(',');
  
  noteStrings.forEach((noteStr, index) => {
    const [noteOctave, timeStr, durationStr] = noteStr.split(':');
    const note = noteOctave.slice(0, -1);
    const octave = parseInt(noteOctave.slice(-1));
    
    notes.push({
      id: `note-${index}`,
      note,
      octave,
      time: parseInt(timeStr),
      duration: parseInt(durationStr),
      velocity: 0.8,
    });
  });
  
  return notes;
}

export function generateScale(root: string, octave: number, type: 'major' | 'minor' = 'major'): Note[] {
  const majorIntervals = [0, 2, 4, 5, 7, 9, 11, 12];
  const minorIntervals = [0, 2, 3, 5, 7, 8, 10, 12];
  const intervals = type === 'major' ? majorIntervals : minorIntervals;
  
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const rootIndex = noteNames.indexOf(root);
  
  return intervals.map((interval, index) => {
    const noteIndex = (rootIndex + interval) % 12;
    const currentOctave = octave + Math.floor((rootIndex + interval) / 12);
    
    return {
      id: `scale-${index}`,
      note: noteNames[noteIndex],
      octave: currentOctave,
      time: index * 500,
      duration: 400,
      velocity: 0.8,
    };
  });
}