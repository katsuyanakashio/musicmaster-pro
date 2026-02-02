'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PianoKeyboard } from '@/components/music/piano-keyboard';
import { FallingNotes } from '@/components/music/falling-notes';
import { Note, GameState } from '@/types';
import { parseMidiData, generateScale } from '@/lib/audio/midi-parser';
import { Play, Pause, Home, Trophy, Music } from 'lucide-react';
import Link from 'next/link';

const SAMPLE_SONGS = [
  {
    id: '1',
    title: 'きらきら星',
    difficulty: '初級',
    notes: 'C4:0:400,C4:500:400,G4:1000:400,G4:1500:400,A4:2000:400,A4:2500:400,G4:3000:800',
    bpm: 120,
  },
  {
    id: '2',
    title: 'ハッピーバースデー',
    difficulty: '初級',
    notes: 'C4:0:300,C4:400:300,D4:800:600,C4:1500:600,F4:2200:600,E4:2900:1200',
    bpm: 100,
  },
  {
    id: '3',
    title: 'ドレミの歌',
    difficulty: '初級',
    notes: 'C4:0:400,D4:500:400,E4:1000:400,C4:1500:400,E4:2000:400,C4:2500:400,E4:3000:800',
    bpm: 130,
  },
  {
    id: '4',
    title: 'Cメジャースケール',
    difficulty: '練習',
    notes: 'C4:0:400,D4:500:400,E4:1000:400,F4:1500:400,G4:2000:400,A4:2500:400,B4:3000:400,C5:3500:800',
    bpm: 100,
  },
];

export default function LessonPage() {
  const [selectedSong, setSelectedSong] = useState(SAMPLE_SONGS[0]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [finalStats, setFinalStats] = useState<GameState | null>(null);
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const parsedNotes = parseMidiData(selectedSong.notes);
    setNotes(parsedNotes);
  }, [selectedSong]);

  const handleStart = () => {
    setIsPlaying(true);
    setGameEnded(false);
    setFinalStats(null);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleGameEnd = (stats: GameState) => {
    setIsPlaying(false);
    setGameEnded(true);
    setFinalStats(stats);
  };

  const handleNoteHit = (note: Note, accuracy: 'perfect' | 'good' | 'miss') => {
    console.log(`Note hit: ${note.note}${note.octave} - ${accuracy}`);
  };

  const handleNotePress = (note: string, octave: number) => {
    const noteKey = `${note}${octave}`;
    setActiveNotes(prev => new Set(prev).add(noteKey));
  };

  const handleNoteRelease = (note: string, octave: number) => {
    const noteKey = `${note}${octave}`;
    setActiveNotes(prev => {
      const newSet = new Set(prev);
      newSet.delete(noteKey);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              楽曲レッスン
            </h1>
            <p className="text-gray-600">落ちてくる音符をタイミングよく弾こう！</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">
              <Home className="mr-2 h-4 w-4" />
              ダッシュボード
            </Button>
          </Link>
        </div>

        {/* Song Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Music className="mr-2 h-5 w-5 text-purple-600" />
              楽曲を選択
            </CardTitle>
            <CardDescription>練習したい曲を選んでください</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {SAMPLE_SONGS.map((song) => (
                <button
                  key={song.id}
                  onClick={() => {
                    setSelectedSong(song);
                    setIsPlaying(false);
                    setGameEnded(false);
                  }}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedSong.id === song.id
                      ? 'border-purple-600 bg-purple-50 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-semibold text-gray-900 mb-1">{song.title}</div>
                  <div className="text-sm text-gray-500">{song.difficulty}</div>
                  <div className="text-xs text-gray-400 mt-2">{song.bpm} BPM</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Game Area */}
        <div className="space-y-6">
          {/* Falling Notes Display */}
          <div>
            <FallingNotes
              notes={notes}
              isPlaying={isPlaying}
              speed={300}
              onNoteHit={handleNoteHit}
              onGameEnd={handleGameEnd}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4">
            {!isPlaying ? (
              <Button onClick={handleStart} size="lg" className="px-12">
                <Play className="mr-2 h-5 w-5" />
                {gameEnded ? '再挑戦' : '開始'}
              </Button>
            ) : (
              <Button onClick={handlePause} size="lg" variant="destructive" className="px-12">
                <Pause className="mr-2 h-5 w-5" />
                一時停止
              </Button>
            )}
          </div>

          {/* Piano Keyboard */}
          <div className="flex justify-center">
            <PianoKeyboard
              activeNotes={activeNotes}
              onNotePress={handleNotePress}
              onNoteRelease={handleNoteRelease}
              startOctave={4}
              numOctaves={2}
            />
          </div>

          {/* Keyboard Hints */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="text-center text-sm text-gray-700">
                <p className="font-semibold mb-2">キーボード操作:</p>
                <p>A S D F G H J K L - 白鍵 (C D E F G A B C D)</p>
                <p>W E T Y U O - 黒鍵 (C# D# F# G# A# C#)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Modal */}
        {gameEnded && finalStats && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl">レッスン完了！</CardTitle>
                <CardDescription>{selectedSong.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    {finalStats.score.toFixed(0)}
                  </div>
                  <div className="text-gray-500">スコア</div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-600">{finalStats.perfect}</div>
                    <div className="text-sm text-gray-500">Perfect</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{finalStats.good}</div>
                    <div className="text-sm text-gray-500">Good</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-600">{finalStats.miss}</div>
                    <div className="text-sm text-gray-500">Miss</div>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">正確度</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {finalStats.accuracy.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500"
                      style={{ width: `${finalStats.accuracy}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setGameEnded(false);
                      setFinalStats(null);
                    }}
                    className="flex-1"
                  >
                    もう一度
                  </Button>
                  <Link href="/dashboard" className="flex-1">
                    <Button variant="outline" className="w-full">
                      終了
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}