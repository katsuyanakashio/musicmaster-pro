'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { audioEngine } from '@/lib/audio/tone-engine';

interface PianoKeyboardProps {
  activeNotes?: Set<string>;
  onNotePress?: (note: string, octave: number) => void;
  onNoteRelease?: (note: string, octave: number) => void;
  startOctave?: number;
  numOctaves?: number;
}

const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];

export function PianoKeyboard({
  activeNotes = new Set(),
  onNotePress,
  onNoteRelease,
  startOctave = 4,
  numOctaves = 2,
}: PianoKeyboardProps) {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    audioEngine.init();
  }, []);

  const handleNotePress = (note: string, octave: number) => {
    const noteKey = `${note}${octave}`;
    setPressedKeys(prev => new Set(prev).add(noteKey));
    audioEngine.playNote(note, octave, '8n', 0.8);
    onNotePress?.(note, octave);
  };

  const handleNoteRelease = (note: string, octave: number) => {
    const noteKey = `${note}${octave}`;
    setPressedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(noteKey);
      return newSet;
    });
    onNoteRelease?.(note, octave);
  };

  const renderKeys = () => {
    const keys = [];
    
    for (let octave = startOctave; octave < startOctave + numOctaves; octave++) {
      whiteKeys.forEach((note, index) => {
        const noteKey = `${note}${octave}`;
        const isPressed = pressedKeys.has(noteKey) || activeNotes.has(noteKey);
        
        keys.push(
          <div
            key={noteKey}
            className={cn(
              'relative h-48 w-12 border-2 border-gray-300 cursor-pointer transition-all duration-75',
              'hover:bg-gray-100 active:bg-gray-200',
              isPressed && 'bg-blue-300 scale-95 shadow-inner'
            )}
            onMouseDown={() => handleNotePress(note, octave)}
            onMouseUp={() => handleNoteRelease(note, octave)}
            onMouseLeave={() => handleNoteRelease(note, octave)}
            onTouchStart={(e) => {
              e.preventDefault();
              handleNotePress(note, octave);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleNoteRelease(note, octave);
            }}
          >
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-600">
              {note}{octave}
            </div>
          </div>
        );
        
        if (blackKeys.includes(`${note}#`)) {
          const blackNote = `${note}#`;
          const blackNoteKey = `${blackNote}${octave}`;
          const isBlackPressed = pressedKeys.has(blackNoteKey) || activeNotes.has(blackNoteKey);
          
          keys.push(
            <div
              key={blackNoteKey}
              className={cn(
                'absolute h-28 w-8 bg-black border-2 border-gray-800 cursor-pointer transition-all duration-75',
                'hover:bg-gray-800 active:bg-gray-700 z-10',
                isBlackPressed && 'bg-blue-600 scale-95 shadow-inner'
              )}
              style={{
                left: `${(index + 1) * 48 - 16}px`,
              }}
              onMouseDown={() => handleNotePress(blackNote, octave)}
              onMouseUp={() => handleNoteRelease(blackNote, octave)}
              onMouseLeave={() => handleNoteRelease(blackNote, octave)}
              onTouchStart={(e) => {
                e.preventDefault();
                handleNotePress(blackNote, octave);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleNoteRelease(blackNote, octave);
              }}
            >
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-white">
                {blackNote.replace('#', '♯')}
              </div>
            </div>
          );
        }
      });
    }
    
    return keys;
  };

  return (
    <div className="relative inline-flex bg-gray-900 p-4 rounded-lg shadow-2xl">
      <div className="relative flex">
        {renderKeys()}
      </div>
    </div>
  );
}