"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";

const ExosomeAboutSection = dynamic(
  () => import("@/components/ExosomeAboutSection"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: "90vh",
          background: "linear-gradient(180deg, #1a1a1a 0%, #333333 100%)",
        }}
      />
    ),
  }
);

const faqData = [
  {
    q: "なぜ鼻からの使用なんですか？",
    a: "鼻粘膜には血管が豊富に存在し、さらに脳へ直接つながる「嗅神経」のルートがあるためです。経口摂取や通常の血管内投与に比べ、成分が全身や鼻腔内に広がりやすい（経鼻吸収）という特性があります。",
  },
  {
    q: "どれくらいで変化を感じられますか？",
    a: "個人差はありますが、早い方では使用後比較的すぐに変化をお感じになる方もいらっしゃいます（※個人の感想です。効果・効能を示すものではありません）。継続的なエイジングケアを目的とする場合は、まずは1〜3ヶ月程度の継続をおすすめしています。",
  },
  {
    q: "使用上の注意はありますか？",
    a: "本製品は医薬品ではなく、ヒト由来の成分を精製したものです。現在のところ、重大な健康被害の報告はございません。万が一、鼻粘膜に刺激を感じたり体調に異変を感じた場合は、使用を中止し医師にご相談ください。",
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
      <HeroSection />

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
            そのお悩み、成分が「必要な場所に届いていない」ことが一因かもしれません。
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
            脳へのルートを活用する、<br className="md:hidden" />次世代ホームケア。
          </h2>
          <p className="text-center text-[#A8D8EA] text-lg mb-16 fade-in fade-in-delay-1">
            &ldquo;経鼻吸収&rdquo;という<br className="md:hidden" />新発想の幹細胞由来エクソソーム濾液
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
                経口摂取や通常の血管内投与に比べ、鼻腔内には血管が豊富であり、「嗅神経」を介して脳に隣接するルートが存在します。Stem Filtraは、この経鼻吸収という特性に着目。希少なエクソソームをロスなく、最短距離でアプローチします。
                <br /><span className="text-xs text-[#999] block mt-2">※本製品は医薬品ではなく、脳への直接作用・治療効果を示すものではありません。</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 5. エクソソームとは Section ==================== */}
      <ExosomeAboutSection />

      {/* ==================== 6. USP Section ==================== */}
      <section className="py-20 md:py-32 bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif-jp text-2xl md:text-3xl lg:text-4xl text-white text-center mb-16 fade-in">
            不純物を許さない、高精度な濾過プロセス
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

          {/* Feature icons — sequential step process */}
          <div className="fade-in fade-in-delay-3">
            <div className="flex flex-col md:flex-row items-stretch">

              {/* ── STEP 01: 凍結融解処理 ── */}
              <div
                className="glass flex-1 p-8 text-center"
                style={{ animation: "uspStepCardGlow 9s ease-in-out infinite", animationDelay: "0s" }}
              >
                <p
                  className="text-[10px] tracking-[0.3em] mb-5 font-zen"
                  style={{ animation: "uspStepBadgeGlow 9s ease-in-out infinite", animationDelay: "0s" }}
                >
                  STEP 01
                </p>
                <div
                  className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden flex items-center justify-center"
                  style={{ animation: "uspStepIconGlow 9s ease-in-out infinite", animationDelay: "0s" }}
                >
                  <Image src="/images/icon-freeze.png" alt="凍結融解処理アイコン" width={80} height={80} className="object-contain" />
                </div>
                <p className="text-white text-base font-medium mb-2">凍結融解処理</p>
                <p className="text-white/45 text-xs leading-relaxed">幹細胞を凍結・融解し<br />有効成分を抽出</p>
              </div>

              {/* ── Connector 1 ── */}
              {/* Desktop: horizontal */}
              <div className="hidden md:flex items-center justify-center flex-shrink-0" style={{ width: "52px" }}>
                <div className="relative w-full" style={{ height: "1px", overflow: "visible" }}>
                  <div style={{ position: "absolute", inset: 0, animation: "uspConnLine1 9s ease-in-out infinite" }} />
                  <div style={{
                    position: "absolute", right: "-5px", top: "50%",
                    transform: "translateY(-50%) rotate(45deg)",
                    width: "7px", height: "7px",
                    borderTop: "1.5px solid rgba(255,255,255,0.12)",
                    borderRight: "1.5px solid rgba(255,255,255,0.12)",
                    animation: "uspConnArrow1 9s ease-in-out infinite",
                  }} />
                  <div style={{
                    position: "absolute", top: "50%", transform: "translateY(-50%)",
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: "radial-gradient(circle, #A8D8EA 0%, rgba(168,216,234,0.3) 100%)",
                    boxShadow: "0 0 8px rgba(168,216,234,0.9), 0 0 16px rgba(168,216,234,0.4)",
                    animation: "uspDotH1 9s linear infinite",
                  }} />
                </div>
              </div>
              {/* Mobile: vertical */}
              <div className="md:hidden flex justify-center" style={{ height: "44px" }}>
                <div className="relative" style={{ width: "1px", height: "100%", overflow: "visible" }}>
                  <div style={{ position: "absolute", inset: 0, animation: "uspConnLine1 9s ease-in-out infinite" }} />
                  <div style={{
                    position: "absolute", bottom: "-5px", left: "50%",
                    transform: "translateX(-50%) rotate(135deg)",
                    width: "7px", height: "7px",
                    borderTop: "1.5px solid rgba(255,255,255,0.12)",
                    borderRight: "1.5px solid rgba(255,255,255,0.12)",
                    animation: "uspConnArrow1 9s ease-in-out infinite",
                  }} />
                  <div style={{
                    position: "absolute", left: "50%", transform: "translateX(-50%)",
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: "radial-gradient(circle, #A8D8EA 0%, rgba(168,216,234,0.3) 100%)",
                    boxShadow: "0 0 8px rgba(168,216,234,0.9)",
                    animation: "uspDotV1 9s linear infinite",
                  }} />
                </div>
              </div>

              {/* ── STEP 02: 0.22μm濾過滅菌 ── */}
              <div
                className="glass flex-1 p-8 text-center"
                style={{ animation: "uspStepCardGlow 9s ease-in-out infinite", animationDelay: "-6s" }}
              >
                <p
                  className="text-[10px] tracking-[0.3em] mb-5 font-zen"
                  style={{ animation: "uspStepBadgeGlow 9s ease-in-out infinite", animationDelay: "-6s" }}
                >
                  STEP 02
                </p>
                <div
                  className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden flex items-center justify-center"
                  style={{ animation: "uspStepIconGlow 9s ease-in-out infinite", animationDelay: "-6s" }}
                >
                  <Image src="/images/icon-filter.png" alt="0.22μm濾過滅菌アイコン" width={80} height={80} className="object-contain" />
                </div>
                <p className="text-white text-base font-medium mb-2">0.22μm濾過滅菌</p>
                <p className="text-white/45 text-xs leading-relaxed">超精密フィルターで<br />不純物を徹底除去</p>
              </div>

              {/* ── Connector 2 ── */}
              {/* Desktop: horizontal */}
              <div className="hidden md:flex items-center justify-center flex-shrink-0" style={{ width: "52px" }}>
                <div className="relative w-full" style={{ height: "1px", overflow: "visible" }}>
                  <div style={{ position: "absolute", inset: 0, animation: "uspConnLine2 9s ease-in-out infinite" }} />
                  <div style={{
                    position: "absolute", right: "-5px", top: "50%",
                    transform: "translateY(-50%) rotate(45deg)",
                    width: "7px", height: "7px",
                    borderTop: "1.5px solid rgba(255,255,255,0.12)",
                    borderRight: "1.5px solid rgba(255,255,255,0.12)",
                    animation: "uspConnArrow2 9s ease-in-out infinite",
                  }} />
                  <div style={{
                    position: "absolute", top: "50%", transform: "translateY(-50%)",
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: "radial-gradient(circle, #A8D8EA 0%, rgba(168,216,234,0.3) 100%)",
                    boxShadow: "0 0 8px rgba(168,216,234,0.9), 0 0 16px rgba(168,216,234,0.4)",
                    animation: "uspDotH2 9s linear infinite",
                  }} />
                </div>
              </div>
              {/* Mobile: vertical */}
              <div className="md:hidden flex justify-center" style={{ height: "44px" }}>
                <div className="relative" style={{ width: "1px", height: "100%", overflow: "visible" }}>
                  <div style={{ position: "absolute", inset: 0, animation: "uspConnLine2 9s ease-in-out infinite" }} />
                  <div style={{
                    position: "absolute", bottom: "-5px", left: "50%",
                    transform: "translateX(-50%) rotate(135deg)",
                    width: "7px", height: "7px",
                    borderTop: "1.5px solid rgba(255,255,255,0.12)",
                    borderRight: "1.5px solid rgba(255,255,255,0.12)",
                    animation: "uspConnArrow2 9s ease-in-out infinite",
                  }} />
                  <div style={{
                    position: "absolute", left: "50%", transform: "translateX(-50%)",
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: "radial-gradient(circle, #A8D8EA 0%, rgba(168,216,234,0.3) 100%)",
                    boxShadow: "0 0 8px rgba(168,216,234,0.9)",
                    animation: "uspDotV2 9s linear infinite",
                  }} />
                </div>
              </div>

              {/* ── STEP 03: 高濃度精製 ── */}
              <div
                className="glass flex-1 p-8 text-center"
                style={{ animation: "uspStepCardGlow 9s ease-in-out infinite", animationDelay: "-3s" }}
              >
                <p
                  className="text-[10px] tracking-[0.3em] mb-5 font-zen"
                  style={{ animation: "uspStepBadgeGlow 9s ease-in-out infinite", animationDelay: "-3s" }}
                >
                  STEP 03
                </p>
                <div
                  className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden flex items-center justify-center"
                  style={{ animation: "uspStepIconGlow 9s ease-in-out infinite", animationDelay: "-3s" }}
                >
                  <Image src="/images/icon-purify.png" alt="高濃度精製アイコン" width={80} height={80} className="object-contain" />
                </div>
                <p className="text-white text-base font-medium mb-2">高濃度精製</p>
                <p className="text-white/45 text-xs leading-relaxed">エクソソームを<br />高濃度に凝縮</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ==================== 7. Developers / Researchers Section ==================== */}
      <section className="relative py-20 md:py-32 dev-section-bg">

        {/* ── Silver geometric network — RIGHT (top-right) ── */}
        <div className="absolute -top-8 -right-8 w-[300px] h-[440px] md:w-[560px] md:h-[760px] lg:w-[700px] lg:h-[900px] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 600 700" fill="none">
            <defs>
              {/* Animated shimmer gradient */}
              <linearGradient id="sr" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="500" y2="350">
                <stop offset="0%" stopColor="#A0A0A0" stopOpacity="0.22" />
                <stop offset="38%" stopColor="#B8B8B8" stopOpacity="0.28" />
                <stop offset="48%" stopColor="#E0E0E0" stopOpacity="0.50" />
                <stop offset="50%" stopColor="#F2F2F2" stopOpacity="0.60" />
                <stop offset="52%" stopColor="#E0E0E0" stopOpacity="0.50" />
                <stop offset="62%" stopColor="#B8B8B8" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#A0A0A0" stopOpacity="0.22" />
                <animateTransform attributeName="gradientTransform" type="translate" values="-600,0;700,0;700,0" keyTimes="0;0.5;1" dur="7s" repeatCount="indefinite" />
              </linearGradient>
              {/* Static silver */}
              <linearGradient id="ss-r" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C0C0C0" stopOpacity="0.20" />
                <stop offset="50%" stopColor="#D0D0D0" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#B0B0B0" stopOpacity="0.18" />
              </linearGradient>
              {/* Glow filter */}
              <filter id="glow-r" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
                <feComposite in="SourceGraphic" in2="b" operator="over" />
              </filter>
            </defs>

            {/* ── Hexagons ── */}
            <polygon points="320,60 372,90 372,150 320,180 268,150 268,90" stroke="url(#sr)" strokeWidth="1.6" fill="none" filter="url(#glow-r)" />
            <polygon points="480,215 519,237 519,283 480,305 441,283 441,237" stroke="url(#sr)" strokeWidth="1.3" fill="none" />
            <polygon points="220,282 253,301 253,339 220,358 187,339 187,301" stroke="url(#sr)" strokeWidth="1.1" fill="none" />
            <polygon points="400,398 428,414 428,446 400,462 372,446 372,414" stroke="url(#sr)" strokeWidth="1.0" fill="none" />
            <polygon points="150,135 172,148 172,173 150,185 128,173 128,148" stroke="url(#ss-r)" strokeWidth="0.9" fill="none" />
            <polygon points="530,400 547,410 547,430 530,440 513,430 513,410" stroke="url(#ss-r)" strokeWidth="0.8" fill="none" />
            <polygon points="280,502 304,516 304,544 280,558 256,544 256,516" stroke="url(#sr)" strokeWidth="0.9" fill="none" />
            <polygon points="100,428 119,439 119,461 100,472 81,461 81,439" stroke="url(#ss-r)" strokeWidth="0.7" fill="none" />

            {/* ── Pentagons ── */}
            <polygon points="460,88 490,110 479,146 441,146 430,110" stroke="url(#sr)" strokeWidth="1.2" fill="none" filter="url(#glow-r)" />
            <polygon points="180,450 209,471 198,504 162,504 152,471" stroke="url(#sr)" strokeWidth="1.0" fill="none" />
            <polygon points="370,256 393,273 384,299 356,299 347,273" stroke="url(#ss-r)" strokeWidth="0.9" fill="none" />
            <polygon points="520,538 541,553 533,578 507,578 499,553" stroke="url(#ss-r)" strokeWidth="0.8" fill="none" />

            {/* ── Animated connecting lines (draw) ── */}
            <line x1="320" y1="120" x2="480" y2="260" stroke="url(#sr)" strokeWidth="0.9" pathLength={1} className="geo-line-draw" />
            <line x1="320" y1="120" x2="150" y2="160" stroke="url(#sr)" strokeWidth="0.7" pathLength={1} className="geo-line-draw" style={{ animationDelay: "0.6s" }} />
            <line x1="320" y1="120" x2="460" y2="120" stroke="url(#sr)" strokeWidth="0.8" pathLength={1} className="geo-line-draw" style={{ animationDelay: "1.2s" }} />
            <line x1="320" y1="120" x2="370" y2="280" stroke="url(#ss-r)" strokeWidth="0.7" pathLength={1} className="geo-line-draw" style={{ animationDelay: "0.3s" }} />
            <line x1="480" y1="260" x2="460" y2="120" stroke="url(#ss-r)" strokeWidth="0.6" pathLength={1} className="geo-line-draw" style={{ animationDelay: "1.8s" }} />
            <line x1="480" y1="260" x2="400" y2="430" stroke="url(#sr)" strokeWidth="0.8" pathLength={1} className="geo-line-draw" style={{ animationDelay: "2.0s" }} />
            <line x1="480" y1="260" x2="530" y2="420" stroke="url(#ss-r)" strokeWidth="0.6" pathLength={1} className="geo-line-draw" style={{ animationDelay: "2.4s" }} />
            <line x1="220" y1="320" x2="370" y2="280" stroke="url(#sr)" strokeWidth="0.7" pathLength={1} className="geo-line-draw" style={{ animationDelay: "0.9s" }} />
            <line x1="220" y1="320" x2="150" y2="160" stroke="url(#ss-r)" strokeWidth="0.6" pathLength={1} className="geo-line-draw" style={{ animationDelay: "1.5s" }} />
            <line x1="400" y1="430" x2="280" y2="530" stroke="url(#sr)" strokeWidth="0.7" pathLength={1} className="geo-line-draw" style={{ animationDelay: "2.8s" }} />
            <line x1="530" y1="420" x2="520" y2="560" stroke="url(#ss-r)" strokeWidth="0.6" pathLength={1} className="geo-line-draw" style={{ animationDelay: "3.2s" }} />
            <line x1="400" y1="430" x2="520" y2="560" stroke="url(#ss-r)" strokeWidth="0.5" pathLength={1} className="geo-line-draw" style={{ animationDelay: "3.5s" }} />

            {/* ── Particle flow lines ── */}
            <line x1="220" y1="320" x2="100" y2="450" stroke="url(#sr)" strokeWidth="0.7" pathLength={1} className="geo-line-particle" />
            <line x1="180" y1="480" x2="280" y2="530" stroke="url(#sr)" strokeWidth="0.6" pathLength={1} className="geo-line-particle" style={{ animationDelay: "1s" }} />
            <line x1="180" y1="480" x2="100" y2="450" stroke="url(#ss-r)" strokeWidth="0.5" pathLength={1} className="geo-line-particle" style={{ animationDelay: "2s" }} />
            <line x1="400" y1="430" x2="370" y2="280" stroke="url(#sr)" strokeWidth="0.6" pathLength={1} className="geo-line-particle" style={{ animationDelay: "1.5s" }} />

            {/* ── Traveling dot particles ── */}
            <circle r="2" fill="#C8C8C8" fillOpacity="0.7">
              <animateMotion dur="4s" repeatCount="indefinite" path="M320,120 L480,260" begin="0s" />
            </circle>
            <circle r="1.5" fill="#D0D0D0" fillOpacity="0.6">
              <animateMotion dur="5s" repeatCount="indefinite" path="M480,260 L400,430" begin="1s" />
            </circle>
            <circle r="1.5" fill="#C0C0C0" fillOpacity="0.5">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M320,120 L150,160" begin="2s" />
            </circle>
            <circle r="1.8" fill="#D4D4D4" fillOpacity="0.6">
              <animateMotion dur="4.5s" repeatCount="indefinite" path="M220,320 L370,280" begin="0.5s" />
            </circle>

            {/* ── Orbital arcs ── */}
            <circle cx="320" cy="120" r="90" stroke="url(#sr)" strokeWidth="0.6" strokeDasharray="12,18" fill="none" />
            <circle cx="320" cy="120" r="108" stroke="url(#ss-r)" strokeWidth="0.3" strokeDasharray="5,14" fill="none" />
            <circle cx="480" cy="260" r="60" stroke="url(#ss-r)" strokeWidth="0.4" strokeDasharray="8,12" fill="none" />
            <circle cx="400" cy="430" r="48" stroke="url(#ss-r)" strokeWidth="0.35" strokeDasharray="6,10" fill="none" />

            {/* ── Diamonds ── */}
            <polygon points="555,100 575,120 555,140 535,120" stroke="url(#sr)" strokeWidth="0.9" fill="none" />
            <polygon points="130,380 142,392 130,404 118,392" stroke="url(#ss-r)" strokeWidth="0.6" fill="none" />
            <polygon points="350,600 362,612 350,624 338,612" stroke="url(#ss-r)" strokeWidth="0.5" fill="none" />

            {/* ── Pulsing nodes ── */}
            <circle cx="320" cy="120" r="2.5" fill="#C0C0C0" fillOpacity="0.6" className="geo-node-pulse" />
            <circle cx="480" cy="260" r="2.5" fill="#C0C0C0" fillOpacity="0.6" className="geo-node-pulse" style={{ animationDelay: "1s" }} />
            <circle cx="460" cy="120" r="2" fill="#C0C0C0" fillOpacity="0.5" className="geo-node-pulse" style={{ animationDelay: "2s" }} />
            <circle cx="220" cy="320" r="2" fill="#C0C0C0" fillOpacity="0.5" className="geo-node-pulse" style={{ animationDelay: "0.5s" }} />
            <circle cx="400" cy="430" r="2" fill="#C0C0C0" fillOpacity="0.5" className="geo-node-pulse" style={{ animationDelay: "1.5s" }} />
            <circle cx="370" cy="280" r="1.8" fill="#C0C0C0" fillOpacity="0.4" className="geo-node-pulse" style={{ animationDelay: "2.5s" }} />
            <circle cx="150" cy="160" r="1.8" fill="#C0C0C0" fillOpacity="0.4" className="geo-node-pulse" style={{ animationDelay: "3s" }} />
            <circle cx="280" cy="530" r="1.8" fill="#C0C0C0" fillOpacity="0.4" className="geo-node-pulse" style={{ animationDelay: "3.5s" }} />
            <circle cx="530" cy="420" r="1.5" fill="#C0C0C0" fillOpacity="0.4" className="geo-node-pulse" style={{ animationDelay: "2.2s" }} />
            <circle cx="520" cy="560" r="1.5" fill="#C0C0C0" fillOpacity="0.3" className="geo-node-pulse" style={{ animationDelay: "3.8s" }} />
            <circle cx="180" cy="480" r="1.5" fill="#C0C0C0" fillOpacity="0.3" className="geo-node-pulse" style={{ animationDelay: "0.8s" }} />
            <circle cx="100" cy="450" r="1.5" fill="#C0C0C0" fillOpacity="0.3" className="geo-node-pulse" style={{ animationDelay: "1.3s" }} />

            {/* ── Cross marks ── */}
            <g stroke="#B8B8B8" strokeWidth="0.5" strokeOpacity="0.2">
              <line x1="565" y1="300" x2="575" y2="300" /><line x1="570" y1="295" x2="570" y2="305" />
              <line x1="80" y1="260" x2="90" y2="260" /><line x1="85" y1="255" x2="85" y2="265" />
              <line x1="440" y1="500" x2="450" y2="500" /><line x1="445" y1="495" x2="445" y2="505" />
            </g>
          </svg>
        </div>

        {/* ── Silver geometric network — LEFT (bottom-left) ── */}
        <div className="absolute -bottom-8 -left-8 w-[300px] h-[440px] md:w-[560px] md:h-[760px] lg:w-[700px] lg:h-[900px] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 600 700" fill="none">
            <defs>
              <linearGradient id="sl" gradientUnits="userSpaceOnUse" x1="600" y1="700" x2="100" y2="350">
                <stop offset="0%" stopColor="#A0A0A0" stopOpacity="0.22" />
                <stop offset="38%" stopColor="#B8B8B8" stopOpacity="0.28" />
                <stop offset="48%" stopColor="#E0E0E0" stopOpacity="0.50" />
                <stop offset="50%" stopColor="#F2F2F2" stopOpacity="0.60" />
                <stop offset="52%" stopColor="#E0E0E0" stopOpacity="0.50" />
                <stop offset="62%" stopColor="#B8B8B8" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#A0A0A0" stopOpacity="0.22" />
                <animateTransform attributeName="gradientTransform" type="translate" values="600,0;-700,0;-700,0" keyTimes="0;0.5;1" dur="7s" begin="3.5s" repeatCount="indefinite" />
              </linearGradient>
              <linearGradient id="ss-l" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#C0C0C0" stopOpacity="0.20" />
                <stop offset="50%" stopColor="#D0D0D0" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#B0B0B0" stopOpacity="0.18" />
              </linearGradient>
              <filter id="glow-l" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
                <feComposite in="SourceGraphic" in2="b" operator="over" />
              </filter>
            </defs>

            {/* ── Hexagons ── */}
            <polygon points="280,520 332,550 332,610 280,640 228,610 228,550" stroke="url(#sl)" strokeWidth="1.6" fill="none" filter="url(#glow-l)" />
            <polygon points="120,395 159,418 159,463 120,485 81,463 81,418" stroke="url(#sl)" strokeWidth="1.3" fill="none" />
            <polygon points="380,342 413,361 413,399 380,418 347,399 347,361" stroke="url(#sl)" strokeWidth="1.1" fill="none" />
            <polygon points="200,238 228,254 228,286 200,302 172,286 172,254" stroke="url(#sl)" strokeWidth="1.0" fill="none" />
            <polygon points="450,475 472,488 472,513 450,525 428,513 428,488" stroke="url(#ss-l)" strokeWidth="0.9" fill="none" />
            <polygon points="70,228 89,239 89,261 70,272 51,261 51,239" stroke="url(#ss-l)" strokeWidth="0.8" fill="none" />
            <polygon points="320,142 344,156 344,184 320,198 296,184 296,156" stroke="url(#sl)" strokeWidth="0.9" fill="none" />
            <polygon points="500,278 519,289 519,311 500,322 481,311 481,289" stroke="url(#ss-l)" strokeWidth="0.7" fill="none" />

            {/* ── Pentagons ── */}
            <polygon points="140,548 170,570 159,606 121,606 110,570" stroke="url(#sl)" strokeWidth="1.2" fill="none" filter="url(#glow-l)" />
            <polygon points="420,190 449,211 438,244 402,244 392,211" stroke="url(#sl)" strokeWidth="1.0" fill="none" />
            <polygon points="230,406 253,423 244,449 216,449 207,423" stroke="url(#ss-l)" strokeWidth="0.9" fill="none" />
            <polygon points="80,128 101,143 93,168 67,168 59,143" stroke="url(#ss-l)" strokeWidth="0.8" fill="none" />

            {/* ── Animated connecting lines (draw) ── */}
            <line x1="280" y1="580" x2="120" y2="440" stroke="url(#sl)" strokeWidth="0.9" pathLength={1} className="geo-line-draw" />
            <line x1="280" y1="580" x2="450" y2="500" stroke="url(#sl)" strokeWidth="0.7" pathLength={1} className="geo-line-draw" style={{ animationDelay: "0.6s" }} />
            <line x1="280" y1="580" x2="140" y2="580" stroke="url(#sl)" strokeWidth="0.8" pathLength={1} className="geo-line-draw" style={{ animationDelay: "1.2s" }} />
            <line x1="280" y1="580" x2="230" y2="430" stroke="url(#ss-l)" strokeWidth="0.7" pathLength={1} className="geo-line-draw" style={{ animationDelay: "0.3s" }} />
            <line x1="120" y1="440" x2="140" y2="580" stroke="url(#ss-l)" strokeWidth="0.6" pathLength={1} className="geo-line-draw" style={{ animationDelay: "1.8s" }} />
            <line x1="120" y1="440" x2="200" y2="270" stroke="url(#sl)" strokeWidth="0.8" pathLength={1} className="geo-line-draw" style={{ animationDelay: "2.0s" }} />
            <line x1="120" y1="440" x2="70" y2="250" stroke="url(#ss-l)" strokeWidth="0.6" pathLength={1} className="geo-line-draw" style={{ animationDelay: "2.4s" }} />
            <line x1="380" y1="380" x2="230" y2="430" stroke="url(#sl)" strokeWidth="0.7" pathLength={1} className="geo-line-draw" style={{ animationDelay: "0.9s" }} />
            <line x1="380" y1="380" x2="450" y2="500" stroke="url(#ss-l)" strokeWidth="0.6" pathLength={1} className="geo-line-draw" style={{ animationDelay: "1.5s" }} />
            <line x1="200" y1="270" x2="320" y2="170" stroke="url(#sl)" strokeWidth="0.7" pathLength={1} className="geo-line-draw" style={{ animationDelay: "2.8s" }} />
            <line x1="70" y1="250" x2="80" y2="148" stroke="url(#ss-l)" strokeWidth="0.6" pathLength={1} className="geo-line-draw" style={{ animationDelay: "3.2s" }} />
            <line x1="200" y1="270" x2="80" y2="148" stroke="url(#ss-l)" strokeWidth="0.5" pathLength={1} className="geo-line-draw" style={{ animationDelay: "3.5s" }} />

            {/* ── Particle flow lines ── */}
            <line x1="380" y1="380" x2="500" y2="300" stroke="url(#sl)" strokeWidth="0.7" pathLength={1} className="geo-line-particle" />
            <line x1="420" y1="220" x2="320" y2="170" stroke="url(#sl)" strokeWidth="0.6" pathLength={1} className="geo-line-particle" style={{ animationDelay: "1s" }} />
            <line x1="420" y1="220" x2="500" y2="300" stroke="url(#ss-l)" strokeWidth="0.5" pathLength={1} className="geo-line-particle" style={{ animationDelay: "2s" }} />
            <line x1="200" y1="270" x2="230" y2="430" stroke="url(#sl)" strokeWidth="0.6" pathLength={1} className="geo-line-particle" style={{ animationDelay: "1.5s" }} />

            {/* ── Traveling dot particles ── */}
            <circle r="2" fill="#C8C8C8" fillOpacity="0.7">
              <animateMotion dur="4s" repeatCount="indefinite" path="M280,580 L120,440" begin="0s" />
            </circle>
            <circle r="1.5" fill="#D0D0D0" fillOpacity="0.6">
              <animateMotion dur="5s" repeatCount="indefinite" path="M120,440 L200,270" begin="1s" />
            </circle>
            <circle r="1.5" fill="#C0C0C0" fillOpacity="0.5">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M280,580 L450,500" begin="2s" />
            </circle>
            <circle r="1.8" fill="#D4D4D4" fillOpacity="0.6">
              <animateMotion dur="4.5s" repeatCount="indefinite" path="M380,380 L230,430" begin="0.5s" />
            </circle>

            {/* ── Orbital arcs ── */}
            <circle cx="280" cy="580" r="85" stroke="url(#sl)" strokeWidth="0.6" strokeDasharray="12,18" fill="none" />
            <circle cx="280" cy="580" r="102" stroke="url(#ss-l)" strokeWidth="0.3" strokeDasharray="5,14" fill="none" />
            <circle cx="120" cy="440" r="58" stroke="url(#ss-l)" strokeWidth="0.4" strokeDasharray="8,12" fill="none" />
            <circle cx="200" cy="270" r="45" stroke="url(#ss-l)" strokeWidth="0.35" strokeDasharray="6,10" fill="none" />

            {/* ── Diamonds ── */}
            <polygon points="45,560 65,580 45,600 25,580" stroke="url(#sl)" strokeWidth="0.9" fill="none" />
            <polygon points="470,380 482,392 470,404 458,392" stroke="url(#ss-l)" strokeWidth="0.6" fill="none" />
            <polygon points="250,110 262,122 250,134 238,122" stroke="url(#ss-l)" strokeWidth="0.5" fill="none" />

            {/* ── Pulsing nodes ── */}
            <circle cx="280" cy="580" r="2.5" fill="#C0C0C0" fillOpacity="0.6" className="geo-node-pulse" />
            <circle cx="120" cy="440" r="2.5" fill="#C0C0C0" fillOpacity="0.6" className="geo-node-pulse" style={{ animationDelay: "1s" }} />
            <circle cx="140" cy="580" r="2" fill="#C0C0C0" fillOpacity="0.5" className="geo-node-pulse" style={{ animationDelay: "2s" }} />
            <circle cx="380" cy="380" r="2" fill="#C0C0C0" fillOpacity="0.5" className="geo-node-pulse" style={{ animationDelay: "0.5s" }} />
            <circle cx="200" cy="270" r="2" fill="#C0C0C0" fillOpacity="0.5" className="geo-node-pulse" style={{ animationDelay: "1.5s" }} />
            <circle cx="230" cy="430" r="1.8" fill="#C0C0C0" fillOpacity="0.4" className="geo-node-pulse" style={{ animationDelay: "2.5s" }} />
            <circle cx="450" cy="500" r="1.8" fill="#C0C0C0" fillOpacity="0.4" className="geo-node-pulse" style={{ animationDelay: "3s" }} />
            <circle cx="320" cy="170" r="1.8" fill="#C0C0C0" fillOpacity="0.4" className="geo-node-pulse" style={{ animationDelay: "3.5s" }} />
            <circle cx="70" cy="250" r="1.5" fill="#C0C0C0" fillOpacity="0.4" className="geo-node-pulse" style={{ animationDelay: "2.2s" }} />
            <circle cx="80" cy="148" r="1.5" fill="#C0C0C0" fillOpacity="0.3" className="geo-node-pulse" style={{ animationDelay: "3.8s" }} />
            <circle cx="420" cy="220" r="1.5" fill="#C0C0C0" fillOpacity="0.3" className="geo-node-pulse" style={{ animationDelay: "0.8s" }} />
            <circle cx="500" cy="300" r="1.5" fill="#C0C0C0" fillOpacity="0.3" className="geo-node-pulse" style={{ animationDelay: "1.3s" }} />

            {/* ── Cross marks ── */}
            <g stroke="#B8B8B8" strokeWidth="0.5" strokeOpacity="0.2">
              <line x1="35" y1="400" x2="45" y2="400" /><line x1="40" y1="395" x2="40" y2="405" />
              <line x1="520" y1="440" x2="530" y2="440" /><line x1="525" y1="435" x2="525" y2="445" />
              <line x1="160" y1="180" x2="170" y2="180" /><line x1="165" y1="175" x2="165" y2="185" />
            </g>
          </svg>
        </div>

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

          {/* TODO: 動画が準備できたら以下のコメントを解除し、VIDEO_IDを設定してください */}
          {/* <div className="max-w-3xl mx-auto fade-in">
            <div className="relative w-full aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden flex items-center justify-center">
              <iframe
                className="absolute inset-0 w-full h-full rounded-2xl"
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="紹介動画"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div> */}
        </div>
      </section>

      {/* ==================== 8. Testimonials Section ==================== */}
      <section className="py-20 md:py-32 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif-jp text-2xl md:text-3xl lg:text-4xl text-[#333] text-center mb-16 fade-in">
            お客様の声
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: "50代に入ってから朝の重だるさが抜けず悩んでいました。点鼻という新しい方法に半信半疑でしたが、使い始めて2週間ほどで目覚めが驚くほどすっきりするように。夜も深く眠れている実感があり、毎日が軽くなりました。",
                name: "Y.S 様（52歳・女性）",
              },
              {
                text: "年齢とともに肌のハリが気になっていたところ、知人の紹介で出会いました。1ヶ月ほど続けたあたりから、鏡を見るのが楽しみになるくらい肌の調子が整ってきて、周囲からも「最近なんか若々しいね」と言われるようになりました。",
                name: "M.T 様（47歳・女性）",
              },
              {
                text: "経営者として多忙な日々を送る中、集中力の低下や疲労の蓄積を感じていました。使い始めてから頭のクリアさが戻ってきた感覚があり、夕方以降もパフォーマンスが落ちにくくなりました。体のメンテナンスとして今後も続けたいと思います。",
                name: "K.N 様（58歳・男性）",
              },
            ].map((review, i) => (
              <div
                key={i}
                className={`glass-light p-8 fade-in fade-in-delay-${i + 1}`}
              >
                <div className="text-[#A8D8EA] text-xl mb-4 tracking-wider">
                  ★★★★★
                </div>
                <p className="text-[#333] text-base leading-relaxed mb-6">
                  {review.text}
                </p>
                <p className="text-[#8A8A8A] text-sm">{review.name}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#AAAAAA] text-xs mt-8 fade-in">
            ※掲載の内容はお客様個人の感想です。効果・効能を示すものではありません。個人差があります。
          </p>
        </div>
      </section>

      {/* ==================== 9. CTA Section ==================== */}
      <section className="relative py-20 md:py-32 cta-section-bg">
        {/* Top border line */}
        <div
          className="absolute top-0 left-0 w-full h-px z-10"
          style={{ background: "linear-gradient(to right, transparent, #A8D8EA, transparent)" }}
        />
        {/* Bottom border line */}
        <div
          className="absolute bottom-0 left-0 w-full h-px z-10"
          style={{ background: "linear-gradient(to right, transparent, #A8D8EA, transparent)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* ① セクションタイトル（キャッチコピー） */}
          <div className="text-center mb-6 md:mb-8 fade-in">
            <h2
              className="font-serif-jp text-3xl md:text-5xl text-white font-bold"
              style={{ letterSpacing: "0.15em" }}
            >
              届かなければ、意味がない。
            </h2>
            <div className="w-20 h-px bg-[#A8D8EA] mx-auto mt-6" />
          </div>

          {/* ② サブコピー（説明文） - 各行0.2秒ずつ遅延フェードイン */}
          <div className="text-center mb-14 md:mb-16">
            <p className="text-sm md:text-base text-white/75 leading-[2.0] fade-in fade-in-delay-1">
              医学博士の着想から生まれた「鼻から届ける」新発想。
            </p>
            <p className="text-sm md:text-base text-white/75 leading-[2.0] fade-in fade-in-delay-2">
              凍結融解、0.22μm濾過滅菌——一切の妥協なき精製を経て、
            </p>
            <p className="text-sm md:text-base text-white/75 leading-[2.0] fade-in fade-in-delay-3">
              一滴に凝縮された成分が、あなたの手元へ届きます。
            </p>
          </div>

          {/* ③ 商品画像 + 商品情報エリア（グラスモーフィズムカード） */}
          <div
            className="cta-glass-card p-10 md:p-12 lg:p-[60px] mb-12 md:mb-14 fade-in"
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
              {/* 左: 商品画像 */}
              <div className="flex-shrink-0">
                <div className="relative w-[240px] md:w-[300px]">
                  <Image
                    src="/images/product-package.png"
                    alt="Stem Filtra Activation パッケージ"
                    width={300}
                    height={300}
                    className="object-contain w-full h-auto"
                    style={{ filter: "drop-shadow(0 0 40px rgba(168,216,234,0.3))" }}
                  />
                </div>
              </div>

              {/* 右: 商品情報 */}
              <div className="text-center md:text-left">
                <p
                  className="text-xl md:text-2xl text-white font-medium mb-3"
                  style={{ letterSpacing: "0.2em" }}
                >
                  Stem Filtra Activation
                </p>
                <div className="w-10 h-px bg-[#A8D8EA] mb-3 mx-auto md:mx-0" />
                <p
                  className="text-sm md:text-base text-white/60 mb-6"
                  style={{ letterSpacing: "0.15em" }}
                >
                  幹細胞濾液賦活剤
                </p>
                <p className="text-sm text-white/50 mb-6">
                  4本セット（1ヶ月分 / 1週間1本）
                </p>
                <div className="mb-2">
                  <p className="text-white font-bold">
                    <span className="text-2xl md:text-3xl align-baseline">¥</span>
                    <span className="text-4xl md:text-5xl">1,200,000</span>
                  </p>
                </div>
                <p className="text-xs text-white/40 flex items-center justify-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
                  </svg>
                  税抜き・クール冷蔵送料込み
                </p>
              </div>
            </div>
          </div>

          {/* ④ CTAボタン - 0.6s遅延 + 常時パルス */}
          <div
            className="text-center fade-in"
            style={{ transitionDelay: "0.6s" }}
          >
            <Link
              href="/purchase"
              className="cta-btn-primary inline-block px-12 py-5 md:px-16 md:py-6 rounded-[60px] text-base md:text-lg font-bold"
              style={{ letterSpacing: "0.1em" }}
            >
              最新のエイジングケアを体験する
            </Link>
            <p className="text-xs text-white/40 mt-4">
              送料無料・医師のカウンセリング付き
            </p>
          </div>

          {/* ⑤ 信頼バッジ */}
          <div
            className="flex flex-wrap justify-center gap-3 mt-10 fade-in"
            style={{ transitionDelay: "0.8s" }}
          >
            {["医学博士開発", "国内CPC製造", "医師カウンセリング付"].map((badge) => (
              <span
                key={badge}
                className="text-xs text-white/35 border border-white/15 rounded-full px-4 py-1"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 9.5 ご購入からご使用までの流れ ==================== */}
      <section className="py-20 md:py-32" style={{ background: "#0D0D0D" }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif-jp text-2xl md:text-3xl lg:text-4xl text-white text-center mb-4 fade-in">
            ご購入からご使用までの流れ
          </h2>
          <p className="text-white/40 text-sm text-center mb-16 fade-in fade-in-delay-1">
            医師のカウンセリングを経て、安心してお使いいただけます
          </p>

          <div className="relative fade-in fade-in-delay-2">
            {/* 縦のタイムライン */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
              style={{ background: "linear-gradient(to bottom, rgba(168,216,234,0.4), rgba(168,216,234,0.08))" }}
            />

            {[
              {
                step: "STEP 1",
                title: "ご注文・お支払い",
                desc: "サイトからご注文後、銀行振込にてお支払い。カウンセリングのご希望日時もこの時にお伺いします。",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                ),
              },
              {
                step: "STEP 2",
                title: "ご入金確認",
                desc: "お振込みを確認後、1〜2営業日以内にメールにてカウンセリング日時の確定をご連絡いたします。",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                ),
              },
              {
                step: "STEP 3",
                title: "医師とのオンラインカウンセリング",
                desc: "提携美容クリニックの医師と15〜20分のリモート面談。使用方法のご説明、体質・アレルギーの確認、ご不明点のご相談を行います。",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                ),
                highlight: true,
              },
              {
                step: "STEP 4",
                title: "商品発送",
                desc: "カウンセリング完了後、ヤマト運輸クール宅急便にて発送。追跡番号をメールでお知らせいたします。",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="1.5">
                    <rect x="1" y="3" width="15" height="13" rx="2" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                ),
              },
              {
                step: "STEP 5",
                title: "ご使用開始",
                desc: "医師のアドバイスに基づき、安心してご使用いただけます。ご不明点はいつでも専門スタッフがサポートいたします。",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="1.5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* ドット */}
                <div
                  className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full md:-translate-x-1/2 -translate-x-1/2 mt-5 z-10"
                  style={{
                    background: item.highlight ? "#A8D8EA" : "rgba(168,216,234,0.5)",
                    boxShadow: item.highlight ? "0 0 12px rgba(168,216,234,0.6)" : "none",
                  }}
                />

                {/* カード */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-40px)] ${i % 2 === 0 ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"}`}>
                  <div
                    className="rounded-2xl p-5 md:p-6"
                    style={{
                      background: item.highlight
                        ? "rgba(168,216,234,0.06)"
                        : "rgba(255,255,255,0.03)",
                      border: item.highlight
                        ? "1px solid rgba(168,216,234,0.25)"
                        : "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: item.highlight
                            ? "rgba(168,216,234,0.15)"
                            : "rgba(168,216,234,0.08)",
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[#A8D8EA] text-[10px] tracking-[0.2em] font-medium">{item.step}</p>
                        <p className="text-white text-sm font-medium">{item.title}</p>
                      </div>
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed pl-[52px]">{item.desc}</p>
                    {item.highlight && (
                      <div
                        className="mt-3 ml-[52px] rounded-lg px-3 py-2 inline-flex items-center gap-2"
                        style={{
                          background: "rgba(168,216,234,0.08)",
                          border: "1px solid rgba(168,216,234,0.15)",
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A8D8EA" strokeWidth="2">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span className="text-[#A8D8EA]/80 text-[10px]">カウンセリング費用は商品代金に含まれます</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
                <span className="text-[#A8D8EA] text-sm font-bold block mb-1">
                  Step {i + 1}
                </span>
                <p className="text-[#333] text-base font-medium">
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
            あなたのエイジングケアを、今日から。
          </p>
          <div className="fade-in fade-in-delay-2">
            <Link
              href="/purchase"
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
            一般社団法人　健康事業支援機構
          </p>
          <p className="text-white/50 text-xs md:text-sm mb-8">
            〒350-1124 埼玉県川越市新宿町3丁目10-1 403
          </p>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-8">
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

          {/* 薬機法・景品表示法に基づく免責表記 */}
          <div className="border-t border-white/10 pt-8 mb-6">
            <p className="text-white/25 text-[10px] leading-[1.9] tracking-[0.05em] max-w-3xl mx-auto">
              【免責事項】本製品は医薬品・医療機器ではありません。疾病の診断・治療・予防を目的としたものではありません。本サイトに掲載されているお客様の声・体験談は個人の感想であり、すべての方に同様の効果があることを示すものではありません。本製品の使用に際しては、体調に異変を感じた場合は直ちに使用を中止し、医師にご相談ください。妊娠中・授乳中の方、疾患をお持ちの方は使用前に医師にご相談ください。
            </p>
          </div>

          <p className="text-white/30 text-xs">
            © 2025 一般社団法人　健康事業支援機構. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
