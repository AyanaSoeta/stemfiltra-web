import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | Stem Filtra Activation",
};

const sections = [
  {
    title: "第1条（適用）",
    content:
      "本規約は、一般社団法人健康事業支援機構（HSO）（以下「当社」）が提供するサービス（以下「本サービス」）の利用に関する条件を定めるものです。ご利用のお客様（以下「ユーザー」）は本規約に同意した上で本サービスをご利用ください。",
  },
  {
    title: "第2条（利用登録）",
    content:
      "本サービスの利用を希望する方は、当社の定める方法により利用登録を行うものとします。当社は、利用登録の申請者に以下の事由があると判断した場合、登録を拒否することがあります。\n・虚偽の事項を届け出た場合\n・本規約に違反したことがある場合\n・その他、当社が利用登録を適当でないと判断した場合",
  },
  {
    title: "第3条（禁止事項）",
    content:
      "ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。\n・法令または公序良俗に違反する行為\n・犯罪行為に関連する行為\n・当社または第三者の著作権、商標権等の知的財産権を侵害する行為\n・当社または第三者の名誉・信用を毀損する行為\n・虚偽の情報を登録する行為\n・不正アクセスなどのコンピューター犯罪行為\n・その他、当社が不適切と判断する行為",
  },
  {
    title: "第4条（サービスの提供の停止等）",
    content:
      "当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することがあります。\n・本サービスにかかるコンピューターシステムの保守点検または更新を行う場合\n・地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合\n・その他、当社が本サービスの提供が困難と判断した場合",
  },
  {
    title: "第5条（著作権）",
    content:
      "本サービスに掲載されているコンテンツ（テキスト、画像、動画等）の著作権は当社または正当な権利を有する第三者に帰属します。ユーザーは、当社の事前の書面による承諾なく、これらを複製、転用、販売等する行為を禁じます。",
  },
  {
    title: "第6条（免責事項）",
    content:
      "当社は、本サービスに関して、以下の事項について一切の責任を負いません。\n・本サービスの内容の正確性、完全性、有用性\n・本サービスの利用により生じた損害\n・本サービスの中断または廃止によって生じた損害\n・ユーザー間またはユーザーと第三者との間で生じたトラブル",
  },
  {
    title: "第7条（個人情報の取り扱い）",
    content:
      "当社は、本サービスの利用によって取得する個人情報については、当社「プライバシーポリシー」に従い適切に取り扱います。",
  },
  {
    title: "第8条（利用規約の変更）",
    content:
      "当社は必要に応じて、本規約を変更することができます。変更後の規約は、当サイトに掲載した時点から効力を生じるものとします。",
  },
  {
    title: "第9条（準拠法・管轄裁判所）",
    content:
      "本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、東京地方裁判所を専属的合意管轄とします。",
  },
];

export default function TermsPage() {
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
          利用規約
        </h1>
        <div className="w-12 h-px bg-[#A8D8EA] mb-6" />
        <p className="text-sm text-[#666666] mb-12">
          本利用規約（以下「本規約」）は、一般社団法人健康事業支援機構（HSO）が提供するサービスの利用条件を定めるものです。
        </p>

        <div className="space-y-6">
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
            © 2025 Health Support Organization. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
