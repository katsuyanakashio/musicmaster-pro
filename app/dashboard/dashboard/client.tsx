'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LogOut, Music, Trophy, TrendingUp, Target, Clock } from 'lucide-react';
import Link from 'next/link';

interface DashboardClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    level: number;
    exp: number;
  };
  stats: {
    progressCount: number;
    completedSongs: number;
  };
  recentScores: Array<{
    id: string;
    score: number;
    accuracy: number;
    combo: number;
    createdAt: Date;
    song: {
      title: string;
      difficulty: string;
    };
  }>;
}

export default function DashboardClient({ user, stats, recentScores }: DashboardClientProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const expToNextLevel = user.level * 1000;
  const expProgress = (user.exp / expToNextLevel) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                MusicMaster Pro
              </h1>
              <nav className="hidden md:flex space-x-4">
                <Link href="/dashboard" className="text-blue-600 font-semibold px-3 py-2 rounded-lg bg-blue-50">
                  ダッシュボード
                </Link>
                <Link href="/lesson" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100">
                  レッスン
                </Link>
                <Link href="/metronome" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100">
                  メトロノーム
                </Link>
                <Link href="/library" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100">
                  ライブラリ
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                ログアウト
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            おかえりなさい、{user.name}さん 🎵
          </h2>
          <p className="text-gray-600">今日も音楽を楽しみましょう！</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                レベル
              </CardTitle>
              <Trophy className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{user.level}</div>
              <Progress value={expProgress} className="mt-2" />
              <p className="text-xs text-gray-500 mt-1">
                次のレベルまで {expToNextLevel - user.exp} EXP
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                練習中の曲
              </CardTitle>
              <Music className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.progressCount}</div>
              <p className="text-xs text-gray-500 mt-1">曲</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                完了した曲
              </CardTitle>
              <Target className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stats.completedSongs}</div>
              <p className="text-xs text-gray-500 mt-1">曲</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                連続日数
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">7</div>
              <p className="text-xs text-gray-500 mt-1">日連続 🔥</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                最近のスコア
              </CardTitle>
              <CardDescription>直近5件の演奏記録</CardDescription>
            </CardHeader>
            <CardContent>
              {recentScores.length > 0 ? (
                <div className="space-y-4">
                  {recentScores.map((score) => (
                    <div
                      key={score.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Music className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{score.song.title}</h4>
                          <p className="text-sm text-gray-500">
                            スコア: {score.score} • コンボ: {score.combo}x
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={score.accuracy >= 90 ? 'success' : score.accuracy >= 70 ? 'default' : 'secondary'}>
                          {score.song.difficulty}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">
                          {score.accuracy.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">まだスコアがありません</p>
                  <Link href="/lesson">
                    <Button>
                      最初のレッスンを始める
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">クイックアクション</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/lesson" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Music className="h-4 w-4 mr-2" />
                    レッスンを始める
                  </Button>
                </Link>
                <Link href="/metronome" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    メトロノーム
                  </Button>
                </Link>
                <Link href="/library" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    ライブラリ
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
              <CardHeader>
                <CardTitle className="text-white">今日の目標</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3"></CardContent>
              <div>
              <div className="flex justify-between text-sm mb-1">
                <span>レッスン完了</span>
                <span>2 / 3</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-full rounded-full" style={{ width: '66%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>練習時間</span>
                <span>25 / 30分</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-full rounded-full" style={{ width: '83%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </main>
</div>
);
}