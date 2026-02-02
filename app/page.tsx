import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/features/StatCard';
import { Card } from '@/components/ui/Card';

import { 
  Music, 
  Piano, 
  Target, 
  TrendingUp, 
  Download,
  Shield,
  Zap,
  Award,
  Clock,
  Users
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm mb-8">
            <Music className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            音楽の才能を
            <br />
            開花させよう
          </h1>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            ゲーム感覚で楽しく学べる音楽レッスンアプリ
            <br />
            落ちてくる音符をタイミングよく弾いてマスターしよう
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8">
                無料で始める
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20">
                ログイン
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              すべての機能が揃っています
            </h2>
            <p className="text-lg text-gray-600">
              音楽学習に必要なものがすべてここに
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow border-2 hover:border-purple-200">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <Piano className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">リズムゲーム式レッスン</h3>
              <p className="text-sm text-gray-600">
                上から落ちてくる音符に合わせて演奏。ゲーム感覚で楽しく学べます。
              </p>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2 hover:border-blue-200">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">高機能メトロノーム</h3>
              <p className="text-sm text-gray-600">
                BPMを自由に調整可能。カラー変更機能で視覚的にリズムを把握。
                3/4、4/4、5/4、6/4拍子に対応。
              </p>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2 hover:border-green-200">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">精密な判定システム</h3>
              <p className="text-sm text-gray-600">
                Perfect、Good、Missで正確な評価。タイミングを細かく判定してスコア、コンボ、正確度を記録。
              </p>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2 hover:border-yellow-200">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">進捗トラッキング</h3>
              <p className="text-sm text-gray-600">
                演奏するたびにEXPを獲得してレベルアップ。
                RPGのような成長システムでモチベーション維持。
              </p>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2 hover:border-red-200">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">USBメモリ対応</h3>
              <p className="text-sm text-gray-600">
                お気に入りの楽曲をJSON形式でダウンロード。
                USBメモリに保存して他のデバイスでも使用可能。
              </p>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-2 hover:border-indigo-200">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">安全なログイン</h3>
              <p className="text-sm text-gray-600">
                業界標準のJWT認証とbcryptによるパスワード暗号化。
                あなたのデータを安全に保護します。
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              使い方はとても簡単
            </h2>
            <p className="text-lg text-gray-600">
              3ステップで音楽学習を始められます
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600 text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                アカウント登録
              </h3>
              <p className="text-gray-600">
                無料でアカウントを作成。
                メールアドレスとパスワードだけで始められます。
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                楽曲を選ぶ
              </h3>
              <p className="text-gray-600">
                初級から上級まで豊富な楽曲ライブラリ。
                お気に入りの曲を見つけて練習開始。
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-600 text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                演奏して成長
              </h3>
              <p className="text-gray-600">
                落ちてくる音符に合わせて演奏。
                スコアを競って上達していきましょう。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-purple-600 mb-2">10,000+</div>
              <p className="text-gray-600">アクティブユーザー</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600">楽曲数</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">1M+</div>
              <p className="text-gray-600">レッスン完了</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-pink-600 mb-2">4.9★</div>
              <p className="text-gray-600">ユーザー評価</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ユーザーの声
            </h2>
            <p className="text-lg text-gray-600">
              多くの方に愛用されています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="pt-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Award key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                「ゲーム感覚で楽しく音楽を学べます！落ちてくる音符のビジュアルが分かりやすくて、
                楽譜が読めない初心者でもすぐに始められました。」
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mr-3">
                  A
                </div>
                <div>
                  <p className="font-semibold text-gray-900">山田愛子さん</p>
                  <p className="text-sm text-gray-500">初心者</p>
                </div>
              </div>
            </Card>

            <Card className="pt-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Award key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                「メトロノーム機能が素晴らしい！BPMを細かく調整できて、色も変えられるので
                視覚的にリズムを把握しやすいです。」
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                  T
                </div>
                <div>
                  <p className="font-semibold text-gray-900">田中太郎さん</p>
                  <p className="text-sm text-gray-500">中級者</p>
                </div>
              </div>
            </Card>

            <Card className="pt-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Award key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                「スコアシステムが優秀で、自分の成長が目に見えて分かります。
                Perfect判定を狙うのが楽しくて、毎日練習が続いています！」
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold mr-3">
                  S
                </div>
                <div>
                  <p className="font-semibold text-gray-900">佐藤咲さん</p>
                  <p className="text-sm text-gray-500">上級者</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            今すぐ音楽の旅を始めよう
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            無料アカウント登録で全機能をご利用いただけます
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-12">
              無料で始める →
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Music className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold">MusicMaster Pro</span>
              </div>
              <p className="text-gray-400 text-sm">
                音楽学習を楽しく、効果的に。
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">機能</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/lesson" className="hover:text-white">レッスン</Link></li>
                <li><Link href="/metronome" className="hover:text-white">メトロノーム</Link></li>
                <li><Link href="/library" className="hover:text-white">ライブラリ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">サポート</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">ヘルプセンター</a></li>
                <li><a href="#" className="hover:text-white">よくある質問</a></li>
                <li><a href="#" className="hover:text-white">お問い合わせ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">法的情報</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">利用規約</a></li>
                <li><a href="#" className="hover:text-white">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-white">Cookie設定</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 MusicMaster Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}