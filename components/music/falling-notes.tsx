'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Note, FallingNote, GameState } from '@/types';
import { cn } from '@/lib/utils';

interface FallingNotesProps {
  notes: Note[];
  isPlaying: boolean;
  speed: number;
  onNoteHit?: (note: Note, accuracy: 'perfect' | 'good' | 'miss') => void;
  onGameEnd?: (stats: GameState) => void;
}

const FALL_DISTANCE = 600;
const HIT_ZONE_Y = 520;
const PERFECT_THRESHOLD = 30;
const GOOD_THRESHOLD = 60;

export function FallingNotes({ notes, isPlaying, speed, onNoteHit, onGameEnd }: FallingNotesProps) {
  const [fallingNotes, setFallingNotes] = useState<FallingNote[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    combo: 0,
    perfect: 0,
    good: 0,
    miss: 0,
    accuracy: 100,
  });
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);

  const noteToPosition = useCallback((note: string, octave: number): number => {
    const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];
    
    let position = 0;
    const isBlack = note.includes('#');
    
    if (isBlack) {
      const baseNote = note.replace('#', '');
      const baseIndex = whiteKeys.indexOf(baseNote);
      position = (octave - 4) * 7 * 48 + baseIndex * 48 + 32;
    } else {
      const index = whiteKeys.indexOf(note);
      position = (octave - 4) * 7 * 48 + index * 48;
    }
    
    return position;
  }, []);

  const initializeNotes = useCallback(() => {
    const initialized = notes.map((note) => ({
      ...note,
      y: -100,
      active: true,
      hit: false,
    }));
    setFallingNotes(initialized);
    startTimeRef.current = Date.now();
  }, [notes]);

  const checkNoteHit = useCallback((note: FallingNote) => {
    const noteKey = `${note.note}${note.octave}`;
    
    if (pressedKeys.has(noteKey)) {
      const distance = Math.abs(note.y - HIT_ZONE_Y);
      
      let accuracy: 'perfect' | 'good' | 'miss';
      let points = 0;
      
      if (distance < PERFECT_THRESHOLD) {
        accuracy = 'perfect';
        points = 100;
        setGameState(prev => ({
          ...prev,
          perfect: prev.perfect + 1,
          combo: prev.combo + 1,
          score: prev.score + points * (1 + prev.combo * 0.1),
        }));
      } else if (distance < GOOD_THRESHOLD) {
        accuracy = 'good';
        points = 50;
        setGameState(prev => ({
          ...prev,
          good: prev.good + 1,
          combo: prev.combo + 1,
          score: prev.score + points * (1 + prev.combo * 0.1),
        }));
      } else {
        accuracy = 'miss';
        setGameState(prev => ({
          ...prev,
          miss: prev.miss + 1,
          combo: 0,
        }));
      }
      
      onNoteHit?.(note, accuracy);
      return true;
    }
    
    return false;
  }, [pressedKeys, onNoteHit]);

  const updateNotes = useCallback(() => {
    if (!isPlaying) return;
    
    const currentTime = Date.now() - startTimeRef.current;
    
    setFallingNotes(prev => {
      const updated = prev.map(note => {
        if (!note.active) return note;
        
        const shouldAppear = currentTime >= note.time;
        if (!shouldAppear) return note;
        
        const newY = ((currentTime - note.time) / 1000) * speed;
        
        if (newY > HIT_ZONE_Y + 100 && !note.hit) {
          setGameState(prev => ({
            ...prev,
            miss: prev.miss + 1,
            combo: 0,
          }));
          return { ...note, active: false };
        }
        
        const hit = checkNoteHit({ ...note, y: newY });
        
        return {
          ...note,
          y: newY,
          hit: hit || note.hit,
          active: newY < FALL_DISTANCE,
        };
      });
      
      const allInactive = updated.every(n => !n.active);
      if (allInactive && isPlaying) {
        const total = gameState.perfect + gameState.good + gameState.miss;
        const accuracy = total > 0 ? ((ga