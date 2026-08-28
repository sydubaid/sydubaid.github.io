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

    'hero.l1': 'バックエンドエンジニア。',
    'hero.l2': 'Java と Go。',
    'hero.sub': 'データを扱うシステムを作っています。日中は Cognizant で Spring Boot のマイクロサービスを開発し、個人開発では F1 のテレメトリー再生エンジンと、ローカルで動くコード検索サービスを作っています。',

    'strip.loc': '所在地',
    'strip.locv': 'インド・チェンナイ',
    'strip.exp': '経験年数',
    'strip.yr': '年',
    'strip.mo': 'ヶ月',
    'strip.open': '希望',
    'strip.openv': '海外勤務 — UAE・サウジアラビア・日本',
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

    'sec.exp': '職務経歴',
    'job.d1': '2025年7月 — 現在',
    'job.r1': 'プログラマーアナリスト',
    'job.r1p': '（2026年7月まで研修職）',
    'job.b1': 'イベント管理プラットフォームのフルスタック Java 開発を担当。Agile / Scrum で進行しました。',
    'job.b2': 'プラットフォームを 3 つのコアサービス（イベント・チケット・通知）と、認証・ユーザー管理の補助サービスに分割し、それぞれ独立してデプロイできるようにしました。',
    'job.b3': 'サービス間通信には OpenFeign を使い、Resilience4j のサーキットブレーカーで障害の連鎖を防ぎました。',
    'job.b4': 'JWT 認証と、管理者・主催者・参加者のロールベースアクセス制御を実装しました。',
    'job.b5': 'Spring Boot Admin で監視を集約し、API は OpenAPI で文書化しました。JUnit 5 と Mockito で単体テストと結合テストを作成しました。',

    'sec.creds': '資格',
    'cert.verify': '認証を確認',
    'edu.deg': '工学士（コンピュータサイエンス）',
    'edu.uni': 'チャンディーガル大学',

    'sec.stack': '技術スタック',
    'st.lang': '言語',
    'st.back': 'バックエンド',
    'st.data': 'データ',
    'st.front': 'フロントエンド',
    'st.infra': 'クラウド・インフラ',
    'st.test': 'テスト',

    'sec.jp': '日本語について',
    'jp.body': '独学中です。現在は N5 程度で、N3 を目標にしています。このページの日本語は機械翻訳ではなく、自分で書いています。面接で説明するより先に、今の水準を正直に書いておきたいと思いました。',

    'sec.contact': '連絡先',
    'contact.note': 'UAE、サウジアラビア、日本、インドでのバックエンド／フルスタックのポジションを探しています。どちらのプロジェクトについても詳しくお話しできます。',

    'foot.src': 'ソース'
  }
};

const TITLES = {
  en: 'Syed Ubaid — Backend Engineer',
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
