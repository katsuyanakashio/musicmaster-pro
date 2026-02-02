'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Download, Upload, Music, Trash2, Play, Search } from 'lucide-react';
import Link from 'next/link';
import { saveAs } from 'file-saver';

interface Song {
  id: string;
  title: string;
  artist: string;
  difficulty: string;
  duration: number;
  bpm: number;
  addedAt: Date;
}

export default function LibraryPage() {
  const [songs, setSongs] = useState<Song[]>([
    {
      id: '1',
      title: 'きらきら星',
      artist: '童謡',
      difficulty: '初級',
      duration: 45,
      bpm: 120,
      addedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'ハッピーバースデー',
      artist: 'トラディショナル',
      difficulty: '初級',
      duration: 30,
      bpm: 100,
      addedAt: new Date('2024-01-20'),
    },
    {
      id: '3',
      title: 'エリーゼのために',
      artist: 'ベートーヴェン',
      difficulty: '中級',
      duration: 180,
      bpm: 72,
      addedAt: new Date('2024-01-25'),
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        console.log('File uploaded:', file.name);
        
        const newSong: Song = {
          id: Date.now().toString(),
          title: file.name.replace(/\.[^/.]+$/, ''),
          artist: 'インポート',
          difficulty: '未設定',
          duration: 0,
          bpm: 120,
          addedAt: new Date(),
        };
        
        setSongs(prev => [...prev, newSong]);
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  const handleDownloadSong = (song: Song) => {
    const songData = {
      title: song.title,
      artist: song.artist,
      difficulty: song.difficulty,
      bpm: song.bpm,
      notes: 'C4:0:400,D4:500:400,E4:1000:400',
    };
    
    const blob = new Blob([JSON.stringify(songData, null, 2)], {
      type: 'application/json',
    });
    
    saveAs(blob, `${song.title}.json`);
  };

  const handleDeleteSong = (id: string) => {
    if (confirm('この楽曲を削除してもよろしいですか？')) {
      setSongs(prev => prev.filter(song => song.id !== id));
    }
  };

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            楽曲ライブラリ
          </h1>
          <p className="text-gray-600">楽曲の管理とダウンロード</p>
        </div>

        {/* Search and Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">楽曲を検索</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="タイトルまたはアーティストで検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">楽曲をインポート</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <label className="flex-1">
                  <Button variant="outline" className="w-full cursor-pointer" asChild>
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      ファイルを選択
                    </span>
                  </Button>
                  <input
                    type="file"
                    accept=".json,.midi,.mid"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                対応形式: JSON, MIDI
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Song List */}
        <Card>
          <CardHeader>
            <CardTitle>マイライブラリ ({filteredSongs.length}曲)</CardTitle>
            <CardDescription>保存された楽曲一覧</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredSongs.length > 0 ? (
              <div className="space-y-4">
                {filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-white to-gray-50 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Music className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{song.title}</h3>
                        <p className="text-sm text-gray-500">{song.artist}</p>
                        <div className="flex gap-3 mt-1">
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                            {song.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">{song.bpm} BPM</span>
                          <span className="text-xs text-gray-500">
                            {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href="/lesson">
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-1" />
                          練習
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadSong(song)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteSong(song.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  {searchQuery ? '楽曲が見つかりませんでした' : '楽曲がありません'}
                </p>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  楽曲をインポート
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* USB Download Info */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="mr-2 h-5 w-5 text-blue-600" />
              USBフラッシュメモリへの保存
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              楽曲データをダウンロードしてUSBメモリに保存できます。
              ダウンロードボタンをクリックすると、JSON形式でファイルが保存されます。
            </p>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-2">保存手順:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                <li>楽曲の「ダウンロード」ボタンをクリック</li>
                <li>保存先にUSBメモリを選択</li>
                <li>ファイルを保存</li>
                <li>他のデバイスでインポート可能</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}