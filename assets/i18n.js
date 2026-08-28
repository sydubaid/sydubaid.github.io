/* ============================================================
   Bilingual strings. No framework, no build step.
   To edit copy: change the value, nothing else.
   Strings containing "<" are inserted as HTML (for <code> spans).
   ============================================================ */

const STRINGS = {
  en: null, // English lives in the HTML as the default; nothing to swap in.

  ja: {
    'skip': '本文へスキップ',

    'nav.work': 'プロジェクト',
    'nav.exp': '職務経歴',
    'nav.creds': '資格',
    'nav.contact': '連絡先',

    'hero.l1': 'ソフトウェアエンジニア。',
    'hero.l2': 'Java, Go ＆ AI。',
    'hero.sub': 'データを動かすスケーラブルなシステムを構築しています。Cognizantではエンタープライズ向けのマイクロサービスを開発。個人プロジェクトでは、ローカルAIモデルによるハイブリッドコード検索や、F1テレメトリリプレイエンジンを開発しています。',

    'strip.loc': '所在地',
    'strip.locv': 'インド・チェンナイ',
    'strip.exp': '経験',
    'strip.expv': '2025年7月〜 · Cognizant',
    
    'strip.stack': '主な技術',

    'cta.resume': '履歴書をダウンロード',
    'cta.mail': 'メール',

    'sec.work': 'プロジェクト',

    'p1.what': '過去の F1 レースを、サーキットマップ、タイミングタワー、ドライバーのテレメトリー（速度・回転数・ギア・スロットル・ブレーキ・DRS）で再生します。再生速度は 1 倍から 40 倍まで対応します。',
    'p1.dlab': '設計上の判断',
    'p1.d': '配信中にレース状態を再計算しません。Python の ETL が 200ms ごとのスナップショットを事前に計算して <code>replay_ticks</code> テーブルへ保存するため、再生はインデックス付きの範囲読み取りになり、どの速度でもシークの挙動が安定します。',

    'p2.what': 'ローカルのリポジトリを SQLite に索引化し、ハイブリッド検索でコードを取得して、ローカルモデルから回答をストリーミングします。ファイル名と行番号も示します。',
    'p2.dlab': '設計上の制約',
    'p2.d': 'Docker、CGO、フレームワーク、外部 API を使いません。Go の標準ライブラリと <code>modernc.org/sqlite</code> のみで構成しています。SHA-256 による差分索引で変更されたチャンクだけを再埋め込みし、ワーカー数を制限して埋め込み処理が計算資源を占有しないようにしています。検索はコサイン類似度に加えて、キーワードと識別子の一致も評価します。',

    
    'p3.what': '聴覚・視覚障害者向けのモバイルアクセシビリティ支援アプリ。手話をリアルタイムでテキストに翻訳し、音声認識と音声合成（STT/TTS）を介して音声アシスタンスを提供します。',
    'p3.dlab': '技術的なアプローチ',
    'p3.d': 'React NativeとExpoを使用して構築。expo-cameraを使用してカメラ入力をキャプチャし、@gradio/client経由でAIモデルにストリーミングしてリアルタイム推論を実行します。ネイティブの音声/STTモジュールを統合し、シームレスな音声フィードバックを実現しました。',
    'sec.exp': '職歴',
    'job.d1': '2025年7月 — 現在',
    'job.r1': 'プログラマーアナリスト',
    'job.b1': 'レガシーなJava 8/StrutsモノリスからSpring Boot 3.5 RESTサービスとAngular 19への移行を行い、フルスタックのエンタープライズワークフローを提供しました。',
    'job.b2': 'キャッシュを利用した並列バッチエンドポイントを実装することで、N+1 APIのボトルネックを解決し、DBのラウンドトリップを約75%削減しました。',
    'job.b3': 'AI支援ツール（Claude Code、OpenAI Codex）を活用し、移行作業、高度なプロンプトエンジニアリング、デバッグを迅速化しました。',
    'job.b4': '再利用可能なAngular UIコンポーネントと、依存関係のないネイティブなXLSXエクスポート機能を設計・開発しました。',
    'job.b5': '<strong>研修期間:</strong> Resilience4jサーキットブレーカーとOpenFeignを使用して、独立したSpring Bootマイクロサービスによるイベント管理プラットフォームを設計しました。',

    'sec.creds': '資格',
    
    'sec.edu': '学歴',
    'edu.deg': '工学士（コンピュータサイエンス）',
    

    'sec.stack': '技術スタック',
    'st.lang': '言語',
    'st.back': 'バックエンド',
    'st.data': 'データ',
    'st.front': 'フロントエンド',
    'st.infra': 'クラウド・インフラ',
    'st.test': '基礎知識・テスト',

    'sec.jp': '日本語について',
    'jp.body': '独学中です。現在は N5 程度で、N3 を目標にしています。このページの日本語は機械翻訳ではなく、自分で書いています。面接で説明するより先に、今の水準を正直に書いておきたいと思いました。',

    'sec.contact': '連絡先',
    'contact.note': 'バックエンドおよびフルスタックの役割にオープンです。プロジェクトについて詳しくお話しできることを楽しみにしています。',

    'foot.src': 'ソース'
  }
};

const TITLES = {
  en: 'Syed Ubaid — Software Engineer',
  ja: 'サイード・ウバイド — バックエンドエンジニア'
};

// Snapshot the English copy from the DOM once, so switching back is lossless.
const EN_SNAPSHOT = {};
document.querySelectorAll('[data-i18n]').forEach(el => {
  EN_SNAPSHOT[el.dataset.i18n] = el.innerHTML;
});

function setLang(lang) {
  const dict = lang === 'ja' ? STRINGS.ja : EN_SNAPSHOT;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = dict[el.dataset.i18n];
    if (val === undefined) return;
    if (val.indexOf('<') !== -1) { el.innerHTML = val; }
    else { el.textContent = val; }
  });

  document.documentElement.lang = lang;
  document.body.dataset.lang = lang;
  document.title = TITLES[lang];

  document.querySelectorAll('.lang button').forEach(b => {
    const on = b.dataset.lang === lang;
    b.classList.toggle('is-on', on);
    b.setAttribute('aria-pressed', String(on));
  });
}

document.querySelectorAll('.lang button').forEach(b => {
  b.addEventListener('click', () => setLang(b.dataset.lang));
});

// Japanese visitors land on Japanese. Everyone else gets English.
setLang(navigator.language && navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en');
