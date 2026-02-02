# MusicMaster Pro

ゲーム感覚で楽しく音楽を学べるレッスンアプリケーション

## 主な機能

- 🎵 リズムゲーム式楽曲レッスン
- 🎹 インタラクティブな仮想ピアノ鍵盤
- ⏱️ 高機能メトロノーム（BPM調整、カラー変更）
- 📊 詳細なスコアトラッキング
- 💾 USBメモリ対応のファイルダウンロード
- 🔐 安全なJWT認証
- 📱 完全レスポンシブデザイン
- 🎮 クロスプラットフォーム対応

## 技術スタック

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Audio**: Tone.js, Web Audio API
- **Animation**: Framer Motion
- **Database**: Prisma + SQLite
- **Authentication**: JWT, bcrypt

## セットアップ

\`\`\`bash
# 依存パッケージインストール
npm install

# 環境変数設定
cp .env.example .env

# データベースマイグレーション
npx prisma migrate dev --name init
npx prisma generate

# 開発サーバー起動
npm run dev
\`\`\`

ブラウザで http://localhost:3000 を開く

## 使い方

1. アカウントを登録
2. 楽曲を選択
3. 落ちてくる音符に合わせて演奏
4. スコアを確認して上達

## キーボード操作

- **白鍵**: A S D F G H J K L
- **黒鍵**: W E T Y U O

## ライセンス

MIT