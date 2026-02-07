"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const faqData = [
  {
    q: "なぜ鼻からの摂取なんですか？",
    a: "鼻粘膜には血管が豊富に存在し、さらに脳へ直接つながる「嗅神経」のルートがあるためです。点滴やサプリメントに比べ、成分が全身や脳へ効率よく届きやすい（DDS：ドラッグデリバリーシステム）というメリットがあります。",
  },
  {
    q: "どれくらいで効果を実感できますか？",
    a: "個人差はありますが、早い方では使用直後から頭のスッキリ感（ブレインフォグの解消）を実感されます。エイジングケアや体調管理を目的とする場合は、まずは1〜3ヶ月程度の継続をおすすめしています。",
  },
  {
    q: "副作用はありますか？",
    a: "本製品は医薬品ではなく、ヒト由来の成分を精製したものです。現在のところ、重大な副作用の報告はございません。万が一、鼻粘膜に刺激を感じたり体調に異変を感じた場合は、使用を中止し医師にご相談ください。",
  },
  {
    q: "安全性は確保されていますか？",
    a: "国内の細胞加工施設（CPC）にて、徹底したドナースクリーニング（ウイルス検査等）をクリアした原料のみを使用しています。また、不純物を極限まで取り除く精製プロセスを経て製品化されています。",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="overflow-hidden">
      {/* ==================== 1. Hero Section ==================== */}
      <section className="hero-water-bg relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Animated ripple rings emanating from center */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="hero-ripple-ring" />
          <div className="hero-ripple-ring" />
          <div className="hero-ripple-ring" />
          <div className="hero-ripple-ring" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-6xl mx-auto px-6 py-16 md:py-20">
          {/* Catch copy - above product */}
          <div className="mb-6 md:mb-10 fade-in">
            <h1
              className="font-serif-jp text-3xl md:text-5xl lg:text-7xl text-white leading-tight mb-1 md:mb-2"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.15)" }}
            >
              脳からめぐる
            </h1>
            <h1
              className="font-serif-jp text-3xl md:text-5xl lg:text-7xl text-white leading-tight"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.15)" }}
            >
              エクソソームの真価
            </h1>
          </div>

          {/* Product bottle image - floating animation */}
          {/* 背景透過PNGを /images/hero-bottle.png に配置してください */}
          <div className="relative mb-6 md:mb-10 fade-in fade-in-delay-1">
            <div className="hero-product-float">
              <div className="relative w-[200px] h-[280px] md:w-[280px] md:h-[380px] lg:w-[320px] lg:h-[430px]">
                <Image
                  src="/images/hero-bottle.png"
                  alt="Stem Filtra Activation ボトル"
                  width={320}
                  height={430}
                  className="object-contain w-full h-full drop-shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
                  priority
                />
              </div>
            </div>
            <div className="hero-product-shadow" />
          </div>

          {/* Product name - below product */}
          <p
            className="text-sm md:text-lg lg:text-xl tracking-[0.3em] text-white/80 mb-8 md:mb-10 fade-in fade-in-delay-2"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.1)" }}
          >
            Stem Filtra Activation
          </p>

          {/* CTA Button */}
          <div className="fade-in fade-in-delay-3">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-full border border-white/50 text-white text-base tracking-wider backdrop-blur-sm hover:bg-white/10 hover:shadow-[0_0_25px_rgba(168,216,234,0.5)] hover:border-[#A8D8EA] transition-all duration-300"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
            >
              最新のエイジングケアを体験する
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== 2. Concept Section ==================== */}
      <section className="relative py-24 md:py-32 bg-[#F8F8F8] water-ripple">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="font-serif-jp text-2xl md:text-3xl lg:text-4xl text-[#333] leading-relaxed mb-8 fade-in">
            「飲む」から「吸う」エイジングケア。
          </p>
          <p className="font-serif-jp text-2xl md:text-3xl lg:text-4xl text-[#333] leading-relaxed mb-12 fade-in fade-in-delay-1">
            美しさは呼吸をするように取り入れる時代へ。
          </p>
          <p className="text-base md:text-lg tracking-[0.3em] text-[#8A8A8A] fade-in fade-in-delay-2">
            Stem Filtra Activation
          </p>
        </div>
      </section>

      {/* ==================== 3. Problem Section ==================== */}
      <section className="py-20 md:py-32 bg-[#2A2A2A]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif-jp text-2xl md:text-3xl lg:text-4xl text-white text-center mb-16 fade-in">
            これまでのケアで満足していますか？
          </h2>
          <div className="flex flex-col gap-4 mb-16">
            {[
              { text: "最近、頭がスッキリしない。集中力が続かない...。", align: "self-start" },
              { text: "肌のくすみ、シミが気になる。", align: "self-end" },
              { text: "肌のハリが減ってきている気がする。", align: "self-start" },
              { text: "体の疲労感が抜けない。", align: "self-end" },
            ].map((item, i) => (
              <div
                key={i}
                className={`glass px-6 py-4 flex items-center gap-3 w-fit ${item.align} fade-in fade-in-delay-${i + 1}`}
              >
                <span className="text-[#A8D8EA] text-xl flex-shrink-0">
                  ✓
                </span>
                <p className="text-white text-base md:whitespace-nowrap">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="font-serif-jp text-lg md:text-xl lg:text-2xl text-[#A8D8EA] text-center leading-relaxed fade-in">
            その原因は、成分が「必要な場所に届いていない」からかもしれません。
          </p>
        </div>
      </section>

      {/* ==================== 4. Solution Section ==================== */}
      <section className="relative py-20 md:py-32 bg-white science-lines overflow-hidden">
        {/* Sparkle particles */}
        <div className="sparkle-field sparkle-field-a" />
        <div className="sparkle-field sparkle-field-b" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <h2 className="font-serif-jp text-2xl md:text-3xl lg:text-4xl text-[#333] text-center mb-4 fade-in">
            脳から若返りスイッチを押す、<br className="md:hidden" />次世代ホームケア。
          </h2>
          <p className="text-center text-[#A8D8EA] text-lg mb-16 fade-in fade-in-delay-1">
            &ldquo;脳へ、届ける&rdquo;<br className="md:hidden" />新発想の幹細胞由来エクソソーム濾液
          </p>
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Image - appears second on mobile, first on PC */}
            <div className="w-full md:w-1/2 order-2 md:order-1 fade-in fade-in-delay-2">
              <div className="relative w-full aspect-[5/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden">
                <Image
                  src="/images/bbb-diagram.png"
                  alt="血液脳関門と嗅神経ルートの図解"
                  width={500}
                  height={300}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            {/* Text - appears first on mobile, second on PC */}
            <div className="w-full md:w-1/2 order-1 md:order-2 fade-in fade-in-delay-3">
              <p className="text-[#333] text-base leading-relaxed">
                口からの摂取や、通常の血管投与では、私たちの体にある強力な関門（血液脳関門）に阻まれ、成分の多くが届く前に排出されてしまいます。しかし、「鼻（嗅神経）」は、脳へと繋がる唯一のダイレクトパス。Stem
                Filtraは、このルートに着目。希少なエクソソームをロスなく、最短距離で届けます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 5. 成分紹介 Section ==================== */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-[#F0F0F0]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif-jp text-2xl md:text-3xl lg:text-4xl text-[#333] text-center mb-16 fade-in">
            医療注目のエクソソームとは？
          </h2>

          {/* Step 01 */}
          <div className="glass-light p-6 md:p-10 mb-8 fade-in">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-[#A8D8EA] text-6xl md:text-8xl font-bold opacity-40 shrink-0">
                01
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden">
                  <Image
                    src="/images/exosome-step01.png"
                    alt="エクソソームの構造イメージ"
                    width={400}
                    height={300}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="font-serif-jp text-xl md:text-2xl text-[#333] mb-4">
                  極小の「司令塔」カプセル
                </h3>
                <p className="text-base text-[#333] leading-relaxed">
                  エクソソームは単なる栄養素ではありません。内部には「細胞を動かす命令データ（miRNA等）」が凝縮されています。
                </p>
              </div>
            </div>
          </div>

          {/* Step 02 - reversed layout on PC */}
          <div className="glass-light p-6 md:p-10 mb-8 fade-in">
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="text-[#A8D8EA] text-6xl md:text-8xl font-bold opacity-40 shrink-0">
                02
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden">
                  <Image
                    src="/images/exosome-step02.png"
                    alt="エクソソームの細胞修復イメージ"
                    width={400}
                    height={300}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="font-serif-jp text-xl md:text-2xl text-[#333] mb-4">
                  ダメージを検知し、スイッチON
                </h3>
                <p className="text-base text-[#333] leading-relaxed">
                  弱った細胞を見つけると、カプセルが融合し、修復のスイッチを入れます。細胞自身が内側から活性化し本来の働きを取り戻します。
                </p>
              </div>
            </div>
          </div>

          {/* Step 03 */}
          <div className="glass-light p-6 md:p-10 fade-in">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-[#A8D8EA] text-6xl md:text-8xl font-bold opacity-40 shrink-0">
                03
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden">
                  <Image
                    src="/images/exosome-step03.png"
                    alt="鼻から脳への吸収ルート"
                    width={400}
                    height={300}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="font-serif-jp text-xl md:text-2xl text-[#333] mb-4">
                  鼻から脳へ「最短ルート」のアプローチ
                </h3>
                <p className="text-base text-[#333] leading-relaxed">
                  消化管を通さず、成分を壊さない。鼻の奥にある脳への直結ルートを利用し、ロスなくスピード吸収を実現させました。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 6. USP Section ==================== */}
      <section className="py-20 md:py-32 bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif-jp text-2xl md:text-3xl lg:text-4xl text-white text-center mb-16 fade-in">
            不純物を許さない、医療レベルの濾過
          </h2>

          {/* Comparison images */}
          <div className="flex flex-col md:flex-row gap-8 mb-4 fade-in fade-in-delay-1">
            <div className="flex-1 text-center">
              <div className="relative w-full aspect-square max-w-[300px] mx-auto bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl overflow-hidden mb-4">
                <Image
                  src="/images/comparison-before.png"
                  alt="従来の上清液"
                  width={300}
                  height={300}
                  className="object-contain w-full h-full"
                />
              </div>
              <p className="text-white/80 text-base">
                従来の上清液
              </p>
            </div>
            <div className="flex-1 text-center">
              <div className="relative w-full aspect-square max-w-[300px] mx-auto bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl overflow-hidden mb-4">
                <Image
                  src="/images/comparison-after.png"
                  alt="Stem Filtra"
                  width={300}
                  height={300}
                  className="object-contain w-full h-full"
                />
              </div>
              <p className="text-white/80 text-base">Stem Filtra</p>
            </div>
          </div>
          <p className="text-right text-white/50 text-xs mb-12">※当社調べ</p>

          <p className="text-white text-base leading-relaxed max-w-3xl mx-auto text-center mb-16 fade-in fade-in-delay-2">
            従来の上清液は培養した液体を使用するのに代わって、本製品は添加物などを使用することなく凍結融解処理にて有効成分の抽出、そこからさらに0.22μmのフィルター濾過滅菌処理を経て高濃度エクソソームを抽出。
          </p>

          {/* Feature icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in fade-in-delay-3">
            {[
              {
                src: "/images/icon-freeze.png",
                alt: "凍結融解処理アイコン",
                label: "凍結融解処理",
              },
              {
                src: "/images/icon-filter.png",
                alt: "0.22μm濾過滅菌アイコン",
                label: "0.22μm濾過滅菌",
              },
              {
                src: "/images/icon-purify.png",
                alt: "高濃度精製アイコン",
                label: "高濃度精製",
              },
            ].map((item, i) => (
              <div key={i} className="glass p-8 text-center">
                <div className="relative w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-white/10 to-white/5 rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <p className="text-white text-base">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 7. Developers / Researchers Section ==================== */}
      <section className="relative py-20 md:py-32 bg-white geometric-pattern">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <h2 className="font-serif-jp text-2xl md:text-3xl lg:text-4xl text-[#333] text-center mb-16 fade-in">
            開発者・監修者
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Developer card */}
            <div className="glass-light p-8 text-center fade-in fade-in-delay-1">
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                <Image
                  src="/images/developer-yamamoto.png"
                  alt="山本 徳則"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-serif-jp text-xl text-[#333] mb-2">
                山本 徳則
              </h3>
              <p className="text-[#8A8A8A] text-sm leading-relaxed mb-6">
                名古屋大学 大学院医学系研究科 特任教授 / 医学博士
              </p>
              <div className="relative w-40 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                <Image
                  src="/images/sign-yamamoto.png"
                  alt="山本 徳則 署名"
                  width={160}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>

            {/* Supervisor card */}
            <div className="glass-light p-8 text-center fade-in fade-in-delay-2">
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                <Image
                  src="/images/supervisor-teshirogi.png"
                  alt="手代木 秀一"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-serif-jp text-xl text-[#333] mb-2">
                手代木 秀一
              </h3>
              <p className="text-[#8A8A8A] text-sm leading-relaxed mb-6">
                一般社団法人健康事業支援機構 遺伝子治療医学研究会 会長
              </p>
              <div className="relative w-40 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                <Image
                  src="/images/sign-teshirogi.png"
                  alt="手代木 秀一 署名"
                  width={160}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* YouTube embed placeholder */}
          <div className="max-w-3xl mx-auto fade-in">
            <div className="relative w-full aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden flex items-center justify-center">
              {/* YouTube URL をここに設定 - 以下のiframeのsrcにYouTube埋め込みURLを入れてください */}
              {/* <iframe
                className="absolute inset-0 w-full h-full rounded-2xl"
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="紹介動画"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              /> */}
              <div className="text-[#8A8A8A] text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-2 opacity-50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <p className="text-sm">動画準備中</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 8. Testimonials Section ==================== */}
      <section className="py-20 md:py-32 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif-jp text-2xl md:text-3xl lg:text-4xl text-[#333] text-center mb-16 fade-in">
            お客様の声
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`glass-light p-8 fade-in fade-in-delay-${i + 1}`}
              >
                <div className="text-[#A8D8EA] text-xl mb-4 tracking-wider">
                  ★★★★★
                </div>
                <p className="text-[#333] text-base leading-relaxed mb-6">
                  使い始めて一週間で寝起きの感覚が変わりました。朝はすっきり、夜はぐっすり寝れるようになりました。
                </p>
                <p className="text-[#8A8A8A] text-sm">Y.S 様</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 9. CTA Section ==================== */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#2A2A2A] via-[#3A3A3A] to-[#2A2A2A] relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, #C0C0C0, transparent 60%), radial-gradient(ellipse at 70% 50%, #A8D8EA, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-10 fade-in">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gradient-to-br from-white/10 to-white/5 rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src="/images/product-package.png"
                alt="Stem Filtra Activation パッケージ"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
          <div className="mb-10 fade-in fade-in-delay-1">
            <p className="font-serif-jp text-4xl md:text-5xl lg:text-6xl text-white mb-2">
              ¥1,150,000
            </p>
            <p className="text-white/70 text-base">
              （税抜き・送料込み）
            </p>
          </div>
          <div className="fade-in fade-in-delay-2">
            <Link
              href="/contact"
              className="cta-glow inline-block px-12 py-5 rounded-full text-white text-base md:text-lg font-medium tracking-wider"
            >
              最新のエイジングケアを体験する
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== 10. How to Use Section ==================== */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif-jp text-2xl md:text-3xl lg:text-4xl text-[#333] text-center mb-16 fade-in">
            ご使用方法
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                src: "/images/howto-step1.png",
                alt: "冷蔵保存",
                text: "使用前後は必ず冷蔵保存",
              },
              {
                src: "/images/howto-step2.png",
                alt: "容器を振る",
                text: "使用前に容器を振る",
              },
              {
                src: "/images/howto-step3.png",
                alt: "鼻の中へ噴射",
                text: "鼻の中へ噴射する",
              },
              {
                src: "/images/howto-step4.png",
                alt: "清潔に保つ",
                text: "使用後は容器を清潔に保つ",
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`glass-light p-4 md:p-6 text-center fade-in fade-in-delay-${i + 1}`}
              >
                <div className="relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={step.src}
                    alt={step.alt}
                    width={200}
                    height={200}
                    className="object-contain w-full h-full"
                  />
                </div>
                <p className="text-[#333] text-xs md:text-sm font-medium">
                  <span className="text-[#A8D8EA] font-bold block mb-1">
                    Step {i + 1}
                  </span>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 11. FAQ Section ==================== */}
      <section className="py-20 md:py-32 bg-[#F5F5F5]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif-jp text-2xl md:text-3xl lg:text-4xl text-[#333] text-center mb-16 fade-in">
            よくあるご質問
          </h2>
          <div className="fade-in fade-in-delay-1">
            {faqData.map((faq, i) => (
              <div key={i} className="border-b border-gray-300">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex justify-between items-center py-6 text-left cursor-pointer"
                >
                  <span className="font-serif-jp text-base text-[#333] pr-4">
                    Q. {faq.q}
                  </span>
                  <span className="text-2xl text-[#8A8A8A] flex-shrink-0 leading-none">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === i ? "max-h-96 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-base text-[#555] leading-relaxed pl-6">
                    A. {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 12. Final CTA + Contact + Footer ==================== */}

      {/* Final CTA */}
      <section className="py-20 md:py-32 bg-[#2A2A2A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-10 fade-in">
            <div className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px] bg-gradient-to-br from-white/10 to-white/5 rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src="/images/product-final.png"
                alt="Stem Filtra Activation 商品画像"
                width={350}
                height={350}
                className="object-contain"
              />
            </div>
          </div>
          <p className="font-serif-jp text-2xl md:text-3xl lg:text-4xl text-white mb-10 leading-relaxed fade-in fade-in-delay-1">
            あなたの&ldquo;若返りスイッチ&rdquo;を、今日から。
          </p>
          <div className="fade-in fade-in-delay-2">
            <Link
              href="/contact"
              className="cta-glow inline-block px-12 py-5 rounded-full text-white text-base md:text-lg font-medium tracking-wider"
            >
              最新のエイジングケアを体験する
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 md:py-20 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-white/80 text-base md:text-lg mb-8 fade-in">
            商品に関するご質問・ご相談はお気軽にどうぞ
          </p>
          <div className="fade-in fade-in-delay-1">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 rounded-full border border-white/40 text-white text-base tracking-wider hover:border-[#A8D8EA] hover:shadow-[0_0_20px_rgba(168,216,234,0.3)] transition-all duration-300"
            >
              お問い合わせはこちら
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 bg-[#111111]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-white text-base mb-2">
            一般社団法人健康事業支援機構（HSO）
          </p>
          <p className="text-white/50 text-xs md:text-sm mb-8">
            〒112-0002 東京都文京区小石川1丁目28-3 TN小石川ビル 2階 NIS
          </p>
          <p className="text-white/30 text-xs">
            © 2025 Health Support Organization. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
