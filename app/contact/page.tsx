"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 実際の送信処理を実装してください
    setSubmitted(true);
  };

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
      <main className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-2xl md:text-3xl font-medium text-[#1A1A1A] mb-2 tracking-wide">
          お問い合わせ
        </h1>
        <div className="w-12 h-px bg-[#A8D8EA] mb-6" />
        <p className="text-sm text-[#666666] mb-12 leading-relaxed">
          商品・サービスに関するご質問、ご相談等はこちらよりお問い合わせください。<br />
          通常2〜3営業日以内にご返信いたします。
        </p>

        {submitted ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-[#A8D8EA]/20 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-[#1A1A1A] mb-2">送信完了</h2>
            <p className="text-sm text-[#666666] mb-6">
              お問い合わせを受け付けました。<br />
              担当者よりご連絡いたしますので、しばらくお待ちください。
            </p>
            <Link
              href="/"
              className="inline-block text-sm text-[#A8D8EA] hover:underline"
            >
              トップページへ戻る
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                お名前 <span className="text-red-400 text-xs">必須</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="山田 太郎"
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-gray-300 focus:outline-none focus:border-[#A8D8EA] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                メールアドレス <span className="text-red-400 text-xs">必須</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-gray-300 focus:outline-none focus:border-[#A8D8EA] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                お問い合わせ種別 <span className="text-red-400 text-xs">必須</span>
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#A8D8EA] transition-colors bg-white"
              >
                <option value="">選択してください</option>
                <option value="product">商品について</option>
                <option value="order">ご注文について</option>
                <option value="shipping">配送について</option>
                <option value="return">返品・交換について</option>
                <option value="other">その他</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                お問い合わせ内容 <span className="text-red-400 text-xs">必須</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="お問い合わせ内容をご記入ください"
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-gray-300 focus:outline-none focus:border-[#A8D8EA] transition-colors resize-none"
              />
            </div>

            <p className="text-xs text-[#999999] leading-relaxed">
              送信いただく前に
              <Link href="/privacy-policy" className="text-[#A8D8EA] hover:underline mx-1">
                プライバシーポリシー
              </Link>
              をご確認ください。送信をもって同意いただいたものとみなします。
            </p>

            <button
              type="submit"
              className="w-full py-4 bg-[#1A1A1A] text-white text-sm tracking-widest rounded-md hover:bg-[#2A2A2A] transition-colors duration-200"
            >
              送信する
            </button>
          </form>
        )}

        {/* Contact Info */}
        <div className="mt-10 p-6 bg-white/60 rounded-lg border border-gray-100">
          <p className="text-xs font-medium text-[#1A1A1A] mb-3">お問い合わせ先</p>
          <p className="text-xs text-[#666666] leading-relaxed">
            一般社団法人　健康事業支援機構<br />
            〒350-1124 埼玉県川越市新宿町3丁目10-1 403<br />
            Email：info@hsojapan.org<br />
            受付時間：平日 10:00〜17:00（土日祝を除く）
          </p>
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
