'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { audioEngine } from '@/lib/audio/tone-engine';
import { cn } from '@/lib/utils';

const COLORS = [
  { name: 'ブルー', value: 'bg-blue-500', glow: 'shadow-blue-500' },
  { name: 'パープル', value: 'bg-purple-500', glow: 'shadow-purple-500' },
  { name: 'ピンク', value: 'bg-pink-500', glow: 'shadow-pink-500' },
  { name: 'グリーン', value: 'bg-green-500', glow: 'shadow-green-500' },
  { name: 'オレンジ', value: 'bg-orange-500', glow: 'shadow-orange-500' },
  { name: 'レッド', value: 'bg-red-500', glow: 'shadow-red-500' },
];

export function Metronome() {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  
  const intervalRef = useRef<NodeJS.Timeout>();
  const beatCountRef = useRef(0);

  useEffect(() => {
    audioEngine.init();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const interval = (60 / bpm) * 1000;
      
      intervalRef.current = setInterval(() => {
        beatCountRef.current = (beatCountRef.current % beatsPerMeasure) + 1;
        setCurrentBeat(beatCountRef.current);
        
        const isAccent = beatCountRef.current === 1;
        audioEngine.playMetronomeBeat(isAccent);
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      beatCountRef.current = 0;
      setCurrentBeat(0);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, bpm, beatsPerMeasure]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setBpm(120);
    setBeatsPerMeasure(4);
    beatCountRef.current = 0;
    setCurrentBeat(0);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          メトロノーム
        </CardTitle>
        <CardDescription className="text-center text-lg">
          テンポとリズムをマスターしよう
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* BPM Display */}
        <div className="text-center">
          <div className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {bpm}
          </div>
          <div className="text-gray-500 text-xl">BPM (Beats Per Minute)</div>
        </div>

        {/* BPM Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>遅い</span>
            <span>速い</span>
          </div>
          <Slider
            min={40}
            max={240}
            step={1}
            value={bpm}
            onValueChange={setBpm}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>40</span>
            <span>240</span>
          </div>
        </div>

        {/* Beat Indicators */}
        <div className="flex justify-center gap-3">
          {[...Array(beatsPerMeasure)].map((_, index) => (
            <div
              key={index}
              className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-100',
                currentBeat === index + 1
                  ? `${selectedColor.value} ${selectedColor.glow} shadow-2xl scale-125`
                  : 'bg-gray-300 scale-100'
              )}
            >
              {index + 1}
            </div>
          ))}
        </div>

        {/* Time Signature */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">拍子</label>
          <div className="flex gap-2">
            {[3, 4, 5, 6].map((beats) => (
              <Button
                key={beats}
                variant={beatsPerMeasure === beats ? 'default' : 'outline'}
                onClick={() => setBeatsPerMeasure(beats)}
                className="flex-1"
              >
                {beats}/4
              </Button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">カラー</label>
          <div className="grid grid-cols-6 gap-2">
            {COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  'w-full aspect-square rounded-lg transition-all',
                  color.value,
                  selectedColor.name === color.name
                    ? `ring-4 ring-offset-2 ${color.glow} shadow-lg scale-110`
                    : 'hover:scale-105'
                )}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handlePlayPause}
            size="lg"
            className="flex-1"
            variant={isPlaying ? 'destructive' : 'default'}
          >
            {isPlaying ? (
              <>
                <Pause className="mr-2 h-5 w-5" />
                停止
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5" />
                開始
              </>
            )}
          </Button>
          
          <Button
            onClick={handleReset}
            size="lg"
            variant="outline"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick BPM Presets */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">プリセット</label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Largo', bpm: 60 },
              { label: 'Andante', bpm: 90 },
              { label: 'Moderato', bpm: 120 },
              { label: 'Allegro', bpm: 150 },
            ].map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                size="sm"
                onClick={() => setBpm(preset.bpm)}
              >
                <div className="text-center">
                  <div className="font-semibold">{preset.label}</div>
                  <div className="text-xs text-gray-500">{preset.bpm}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}