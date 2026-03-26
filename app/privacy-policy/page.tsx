import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Stem Filtra Activation",
};

const sections = [
  {
    title: "1. 個人情報の定義",
    content:
      "本ポリシーにおいて「個人情報」とは、個人情報の保護に関する法律（個人情報保護法）に定める個人情報を指し、生存する個人に関する情報であって、氏名、生年月日、住所、電話番号、メールアドレス等により特定の個人を識別できる情報をいいます。",
  },
  {
    title: "2. 個人情報の収集",
    content:
      "当社は、以下の方法により個人情報を収集することがあります。\n・商品のご購入時\n・お問い合わせ時\n・会員登録時\n・キャンペーン・アンケートへのご参加時",
  },
  {
    title: "3. 個人情報の利用目的",
    content:
      "収集した個人情報は、以下の目的のために利用します。\n・商品の発送及びご連絡\n・お問い合わせへの対応\n・商品・サービスに関するご案内\n・マーケティング調査・分析\n・法令に基づく対応",
  },
  {
    title: "4. 個人情報の第三者提供",
    content:
      "当社は、以下の場合を除き、個人情報を第三者に提供・開示することはありません。\n・お客様の事前の同意がある場合\n・法令に基づく場合\n・人の生命、身体または財産の保護のために必要な場合\n・業務委託先（個人情報の取り扱いを適切に管理）",
  },
  {
    title: "5. 個人情報の安全管理",
    content:
      "当社は、個人情報の漏洩、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。",
  },
  {
    title: "6. Cookieの使用について",
    content:
      "当サイトでは、サービス改善・マーケティング目的でCookieを使用しています。ブラウザの設定によりCookieを無効にすることが可能ですが、一部の機能が利用できなくなる場合があります。",
  },
  {
    title: "7. 個人情報の開示・訂正・削除",
    content:
      "お客様は、当社が保有する自己の個人情報について、開示・訂正・追加・削除・利用停止等を請求することができます。ご請求の際は、本人確認のうえ、合理的な期間内に対応いたします。",
  },
  {
    title: "8. プライバシーポリシーの変更",
    content:
      "当社は、必要に応じて本ポリシーを変更することがあります。変更後のポリシーは当サイトに掲載した時点より効力を生じるものとします。",
  },
  {
    title: "9. お問い合わせ",
    content:
      "個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。\n\n一般社団法人　健康事業支援機構\n〒350-1124 埼玉県川越市新宿町3丁目10-1 403\nEmail：info@hsojapan.org",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <header className="bg-[#111111] py-5 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-white text-sm tracking-widest font-light hover:text-white/70 transition-colors"
          >
            Stem Filtra Activation
          </Link>
          <Link
            href="/"
            className="text-white/50 text-xs hover:text-white/80 transition-colors flex items-center gap-1"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            トップへ戻る
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-2xl md:text-3xl font-medium text-[#1A1A1A] mb-2 tracking-wide">
          プライバシーポリシー
        </h1>
        <div className="w-12 h-px bg-[#A8D8EA] mb-6" />
        <p className="text-sm text-[#666666] mb-12">
          一般社団法人健康事業支援機構（HSO）（以下「当社」）は、お客様の個人情報保護を重要と考え、以下のポリシーに従い適切に取り扱います。
        </p>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-base font-medium text-[#1A1A1A] mb-3">
                {section.title}
              </h2>
              <p className="text-sm text-[#555555] leading-loose whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#999999] mt-10">制定日：2025年1月1日</p>
      </main>

      {/* Footer */}
      <footer className="py-10 bg-[#111111] mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
            <Link href="/tokushoho" className="text-white/50 text-xs hover:text-white/80 transition-colors duration-200">
              特定商取引法に基づく表記
            </Link>
            <span className="text-white/20 text-xs">|</span>
            <Link href="/privacy-policy" className="text-white/50 text-xs hover:text-white/80 transition-colors duration-200">
              プライバシーポリシー
            </Link>
            <span className="text-white/20 text-xs">|</span>
            <Link href="/terms" className="text-white/50 text-xs hover:text-white/80 transition-colors duration-200">
              利用規約
            </Link>
            <span className="text-white/20 text-xs">|</span>
            <Link href="/contact" className="text-white/50 text-xs hover:text-white/80 transition-colors duration-200">
              お問い合わせ
            </Link>
          </nav>
          <p className="text-white/30 text-xs">
            © 2025 一般社団法人　健康事業支援機構. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
