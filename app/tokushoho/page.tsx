import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | Stem Filtra Activation",
};

export default function TokushohoPage() {
  const items = [
    { label: "販売業者", value: "一般社団法人　健康事業支援機構" },
    { label: "代表者名", value: "手代木秀一" },
    {
      label: "所在地",
      value: "〒350-1124 埼玉県川越市新宿町3丁目10-1 403",
    },
    { label: "電話番号", value: "03-5805-0258" },
    {
      label: "メールアドレス",
      value: "info@hsojapan.org",
    },
    { label: "ホームページURL", value: "https://hsojapan.org/" },
    {
      label: "販売価格",
      value: "税抜き¥1,200,000",
    },
    {
      label: "販売価格以外の必要料金",
      value: "お振込手数料はお客様のご負担となります",
    },
    {
      label: "支払方法",
      value: "銀行振込",
    },
    {
      label: "支払期限",
      value: "ご注文後7日以内",
    },
    {
      label: "商品引渡し時期",
      value: "ご入金確認後、3〜7営業日以内に発送",
    },
    {
      label: "返品・交換について",
      value:
        "商品到着後8日以内に限り、未開封・未使用のものに限りご対応いたします。\nお客様のご都合による返品・交換はお受けできない場合がございます。\n商品に不具合があった場合は、到着後8日以内にご連絡ください。",
    },
    {
      label: "返品送料",
      value:
        "お客様都合の場合：お客様負担\n不良品・誤発送の場合：当社負担",
    },
  ];

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
          特定商取引法に基づく表記
        </h1>
        <div className="w-12 h-px bg-[#A8D8EA] mb-12" />

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 last:border-none"
                >
                  <th className="text-left py-5 px-6 text-sm font-medium text-[#1A1A1A] bg-gray-50 w-1/3 align-top">
                    {item.label}
                  </th>
                  <td className="py-5 px-6 text-sm text-[#444444] leading-relaxed whitespace-pre-line">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
