\# VoiceMemo AI - プロジェクト概要



\## 概要

iOS PWA。音声録音 → Gemini AIで文字起こし・要約。

URL: https://kasuyakouta.github.io/voicememo-ai/



\## 技術スタック

\- フロント: GitHub Pages上の単一HTMLファイル(バニラJS or React Babel standalone)

\- バックエンド: Google Apps Script (GAS)

\- AI: Gemini API (gemini-3.5-flash/v1)

\- データ保存: Google Sheets / Drive



\## 必須ルール(標準スタック)

\- iOS Safari互換性・PWA対応を最優先の設計制約とする

\- CORSはGAS側をtext/plainコンテントタイプで受けて回避する

\- 日時はローカル時刻で組み立てる(UTCは使わない)

\- 管理者PINは 3150(他アプリと共通)

\- フォントは IBM Plex Sans JP / Noto Sans JP



\## 直近の変更履歴

\- 主要バグ修正、コード全面再構築

\- 即時保存ロジック実装

\- Gemini API 503エラー時のリトライ処理実装



\## 変更時のお願い

\- 複雑な変更は実装前にオプションA/B形式で提案し、承認を得てから実装する

\- 回答は簡潔に、前置きは省略する

