import Image from "next/image";
import Link from "next/link";

// ── シルバーブルーパーティクル（サイズ 3〜5px）────────────────
const PARTICLES: {
  top: string; left: string; size: number;
  delay: string; dur: string; anim: string;
}[] = [
  { top: "8%",  left: "12%", size: 5,   delay: "0s",   dur: "9s",    anim: "heroPearlParticle"  },
  { top: "15%", left: "78%", size: 4,   delay: "1.5s", dur: "7.5s",  anim: "heroPearlParticleB" },
  { top: "22%", left: "44%", size: 3,   delay: "3.2s", dur: "11s",   anim: "heroPearlParticleC" },
  { top: "35%", left: "88%", size: 4.5, delay: "0.8s", dur: "8.5s",  anim: "heroPearlParticle"  },
  { top: "45%", left: "6%",  size: 4,   delay: "2.4s", dur: "10s",   anim: "heroPearlParticleB" },
  { top: "52%", left: "56%", size: 3,   delay: "4.1s", dur: "7.5s",  anim: "heroPearlParticleC" },
  { top: "62%", left: "24%", size: 5,   delay: "1.0s", dur: "9.5s",  anim: "heroPearlParticle"  },
  { top: "72%", left: "91%", size: 4,   delay: "2.9s", dur: "8s",    anim: "heroPearlParticleB" },
  { top: "80%", left: "38%", size: 3,   delay: "0.5s", dur: "12s",   anim: "heroPearlParticleC" },
  { top: "88%", left: "68%", size: 4,   delay: "3.6s", dur: "7s",    anim: "heroPearlParticle"  },
  { top: "20%", left: "62%", size: 4.5, delay: "5.2s", dur: "9s",    anim: "heroPearlParticleB" },
  { top: "42%", left: "32%", size: 3,   delay: "6.0s", dur: "8s",    anim: "heroPearlParticleC" },
  { top: "60%", left: "75%", size: 4,   delay: "2.0s", dur: "10.5s", anim: "heroPearlParticle"  },
  { top: "5%",  left: "52%", size: 3,   delay: "4.7s", dur: "7s",    anim: "heroPearlParticleB" },
  { top: "93%", left: "20%", size: 4,   delay: "1.3s", dur: "9s",    anim: "heroPearlParticleC" },
  { top: "50%", left: "96%", size: 3,   delay: "3.4s", dur: "8s",    anim: "heroPearlParticle"  },
  { top: "30%", left: "18%", size: 4,   delay: "7.0s", dur: "8.5s",  anim: "heroPearlParticleB" },
  { top: "75%", left: "50%", size: 3,   delay: "5.5s", dur: "9s",    anim: "heroPearlParticleC" },
];

// ── カラーグロウパーティクル（サイズ 4〜5px）──────────────────
const GLOW_PARTICLES: {
  top: string; left: string; size: number;
  delay: string; dur: string; anim: string;
  variant: "gold" | "blue" | "white";
}[] = [
  { top: "12%", left: "28%", size: 5,   delay: "0.5s", dur: "10s",   anim: "heroGlowParticleA", variant: "gold"  },
  { top: "19%", left: "65%", size: 4.5, delay: "2.0s", dur: "8s",    anim: "heroGlowParticleB", variant: "blue"  },
  { top: "33%", left: "40%", size: 4,   delay: "4.5s", dur: "12s",   anim: "heroGlowParticleC", variant: "white" },
  { top: "47%", left: "83%", size: 5,   delay: "1.2s", dur: "9s",    anim: "heroGlowParticleA", variant: "gold"  },
  { top: "56%", left: "15%", size: 4,   delay: "3.8s", dur: "11s",   anim: "heroGlowParticleB", variant: "blue"  },
  { top: "68%", left: "58%", size: 4.5, delay: "0.3s", dur: "7.5s",  anim: "heroGlowParticleC", variant: "white" },
  { top: "78%", left: "33%", size: 4,   delay: "5.2s", dur: "10s",   anim: "heroGlowParticleA", variant: "gold"  },
  { top: "85%", left: "72%", size: 5,   delay: "2.7s", dur: "9.5s",  anim: "heroGlowParticleB", variant: "blue"  },
  { top: "26%", left: "92%", size: 4,   delay: "6.5s", dur: "8.5s",  anim: "heroGlowParticleC", variant: "white" },
  { top: "41%", left: "48%", size: 4.5, delay: "1.8s", dur: "11s",   anim: "heroGlowParticleA", variant: "gold"  },
  { top: "65%", left: "8%",  size: 4,   delay: "4.0s", dur: "9s",    anim: "heroGlowParticleB", variant: "blue"  },
  { top: "90%", left: "46%", size: 4.5, delay: "3.0s", dur: "10.5s", anim: "heroGlowParticleC", variant: "white" },
];

export default function HeroSection() {
  return (
    <section className="hero-pearl-bg relative h-[844px] md:min-h-screen md:flex md:items-center overflow-hidden">

      {/* ════════════════════════════════════════════════════
          z-0  背景レイヤー
          ① オーロラライン（青紫〜シルバー、opacity 0.5-0.65）
          ② シルバーブルーパーティクル
          ③ カラーグロウパーティクル
      ════════════════════════════════════════════════════ */}

      {/* ① オーロラライン ─────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            {/* グラデーション1: ブルー〜パープル（メインライン） */}
            <linearGradient
              id="hl-g1"
              gradientUnits="userSpaceOnUse"
              x1="0" y1="0" x2="420" y2="0"
            >
              <stop offset="0%"   stopColor="rgba(148,168,220,0)"    />
              <stop offset="22%"  stopColor="rgba(155,172,228,0.60)" />
              <stop offset="50%"  stopColor="rgba(178,162,238,0.55)" />
              <stop offset="78%"  stopColor="rgba(152,195,235,0.58)" />
              <stop offset="100%" stopColor="rgba(148,168,220,0)"    />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-420,0; 1860,0"
                dur="28s"
                repeatCount="indefinite"
              />
            </linearGradient>

            {/* グラデーション2: ミッドブルー〜シルバー */}
            <linearGradient
              id="hl-g2"
              gradientUnits="userSpaceOnUse"
              x1="0" y1="0" x2="380" y2="0"
            >
              <stop offset="0%"   stopColor="rgba(162,178,225,0)"    />
              <stop offset="28%"  stopColor="rgba(158,180,228,0.52)" />
              <stop offset="55%"  stopColor="rgba(182,192,238,0.48)" />
              <stop offset="82%"  stopColor="rgba(175,162,232,0.45)" />
              <stop offset="100%" stopColor="rgba(162,178,225,0)"    />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-380,0; 1820,0"
                dur="22s"
                begin="6s"
                repeatCount="indefinite"
              />
            </linearGradient>

            {/* グラデーション3: ラベンダー〜シルバーブルー */}
            <linearGradient
              id="hl-g3"
              gradientUnits="userSpaceOnUse"
              x1="0" y1="0" x2="340" y2="0"
            >
              <stop offset="0%"   stopColor="rgba(185,175,228,0)"    />
              <stop offset="32%"  stopColor="rgba(188,178,232,0.45)" />
              <stop offset="58%"  stopColor="rgba(165,185,228,0.50)" />
              <stop offset="85%"  stopColor="rgba(178,195,235,0.42)" />
              <stop offset="100%" stopColor="rgba(185,175,228,0)"    />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-340,0; 1780,0"
                dur="33s"
                begin="12s"
                repeatCount="indefinite"
              />
            </linearGradient>

            {/* グラデーション4: アイスシルバー〜ブルー */}
            <linearGradient
              id="hl-g4"
              gradientUnits="userSpaceOnUse"
              x1="0" y1="0" x2="460" y2="0"
            >
              <stop offset="0%"   stopColor="rgba(168,192,232,0)"    />
              <stop offset="22%"  stopColor="rgba(165,195,235,0.55)" />
              <stop offset="50%"  stopColor="rgba(185,175,238,0.50)" />
              <stop offset="78%"  stopColor="rgba(172,208,235,0.52)" />
              <stop offset="100%" stopColor="rgba(168,192,232,0)"    />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-460,0; 1900,0"
                dur="25s"
                begin="3s"
                repeatCount="indefinite"
              />
            </linearGradient>

            {/* グラデーション5: シルバー〜パールグレー */}
            <linearGradient
              id="hl-g5"
              gradientUnits="userSpaceOnUse"
              x1="0" y1="0" x2="300" y2="0"
            >
              <stop offset="0%"   stopColor="rgba(188,195,220,0)"    />
              <stop offset="35%"  stopColor="rgba(192,200,228,0.42)" />
              <stop offset="65%"  stopColor="rgba(178,188,218,0.45)" />
              <stop offset="100%" stopColor="rgba(188,195,220,0)"    />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-300,0; 1740,0"
                dur="38s"
                begin="9s"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>

          {/* ── 5本のオーロラカーブ（opacity 0.50〜0.65） ── */}
          {/* Line 1: 上部 */}
          <path
            d="M -100,148 C 200,94 480,202 762,132 S 1085,52 1385,162 S 1625,245 1820,150"
            stroke="url(#hl-g1)"
            strokeWidth="1.4"
            opacity="0.65"
          />
          {/* Line 2: 上中部 */}
          <path
            d="M -150,295 C 178,244 418,358 718,284 S 1038,196 1348,315 S 1590,394 1790,306"
            stroke="url(#hl-g2)"
            strokeWidth="1.2"
            opacity="0.58"
          />
          {/* Line 3: 中部 */}
          <path
            d="M -80,465 C 238,410 508,528 788,454 S 1092,362 1390,478 S 1622,556 1850,466"
            stroke="url(#hl-g3)"
            strokeWidth="1.0"
            opacity="0.52"
          />
          {/* Line 4: 下中部 */}
          <path
            d="M -200,636 C 158,582 438,692 738,616 S 1038,524 1340,642 S 1582,720 1782,632"
            stroke="url(#hl-g4)"
            strokeWidth="1.3"
            opacity="0.60"
          />
          {/* Line 5: 最下部 */}
          <path
            d="M -120,798 C 220,744 495,846 778,768 S 1065,678 1362,800 S 1598,876 1810,786"
            stroke="url(#hl-g5)"
            strokeWidth="1.0"
            opacity="0.50"
          />
        </svg>
      </div>

      {/* ② シルバーブルーパーティクル ──────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {PARTICLES.map((p, i) => (
          <div
            key={`silver-${i}`}
            className="hero-pearl-particle"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationName: p.anim,
              animationDelay: p.delay,
              animationDuration: p.dur,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
        ))}
      </div>

      {/* ③ カラーグロウパーティクル ────────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {GLOW_PARTICLES.map((p, i) => (
          <div
            key={`glow-${i}`}
            className={`hero-glow-particle hero-glow-particle--${p.variant}`}
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationName: p.anim,
              animationDelay: p.delay,
              animationDuration: p.dur,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
        ))}
      </div>

      {/* ════════════════════════════════════════════════════
          z-10  前面レイヤー: テキスト・ボトル・ボタン
      ════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-0 md:pt-0 md:pb-0 md:py-0 md:min-h-screen md:flex md:items-center h-full flex items-center">
        <div className="flex flex-col md:flex-row md:items-center md:gap-14 lg:gap-24 w-full">

          {/* テキスト列 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 relative z-10 -mt-28 md:mt-0">

            <p
              className="hero-animate-in font-zen text-[10px] md:text-[11px] tracking-[0.3em] text-[#2d2d2d]/40 mb-3 md:mb-9 uppercase"
              style={{ animationDelay: "0s" }}
            >
              STEM FILTRA ACTIVATION
            </p>

            <div
              className="hero-animate-in mb-5 md:mb-14"
              style={{ animationDelay: "0.3s" }}
            >
              <h1 className="font-shippori text-[2.2rem] leading-[1.5] md:text-[3.2rem] lg:text-[4rem] text-[#2d2d2d] tracking-wide">
                脳からめぐる
              </h1>
              <h1 className="font-shippori text-[2.2rem] leading-[1.5] md:text-[3.2rem] lg:text-[4rem] text-[#2d2d2d] tracking-wide">
                エクソソームの真価
              </h1>
            </div>

            <div
              className="hero-animate-in"
              style={{ animationDelay: "0.6s" }}
            >
              <Link
                href="/purchase"
                className="hero-ghost-silver inline-block px-7 py-3 md:px-10 md:py-4 rounded-full text-[12px] md:text-sm tracking-[0.14em] text-[#2d2d2d]"
              >
                <span>最新のエイジングケアを体験する</span>
              </Link>
              {/* クール冷蔵配送バッジ */}
              <div
                className="flex items-center justify-center md:justify-start gap-3 mt-3 md:mt-4"
                style={{ opacity: 0.45 }}
              >
                <span className="flex items-center gap-1 text-[10px] md:text-[13px] tracking-[0.12em] text-[#2d2d2d]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="md:w-[13px] md:h-[13px]">
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
                  </svg>
                  クール冷蔵配送
                </span>
                <span className="text-[#2d2d2d]/40 text-[10px] md:text-[13px]">·</span>
                <span className="text-[10px] md:text-[13px] tracking-[0.12em] text-[#2d2d2d]">送料無料</span>
                <span className="text-[#2d2d2d]/40 text-[10px] md:text-[13px]">·</span>
                <span className="text-[10px] md:text-[13px] tracking-[0.12em] text-[#2d2d2d]">正規品保証</span>
              </div>
            </div>
          </div>

          {/* ボトル列: SPでは右下に絶対配置 */}
          <div className="flex justify-center mt-4 md:mt-0 md:flex-shrink-0">
            <div className="relative">

              {/* z-[1]: 水面リップル */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 1 }}
                aria-hidden="true"
              >
                <div className="hero-ripple-pearl" style={{ animationDelay: "0s"    }} />
                <div className="hero-ripple-pearl" style={{ animationDelay: "1.27s" }} />
                <div className="hero-ripple-pearl" style={{ animationDelay: "2.53s" }} />
              </div>

              {/* z-[2]: ボトル（浮遊） */}
              <div className="hero-bottle-pearl-float" style={{ position: "relative", zIndex: 2 }}>
                <Image
                  src="/images/bottle.png"
                  alt="Stem Filtra Activation ボトル"
                  width={400}
                  height={580}
                  className="object-contain w-[160px] md:w-[300px] lg:w-[360px] h-auto"
                  style={{
                    filter:
                      "drop-shadow(0 14px 32px rgba(115, 115, 145, 0.20)) drop-shadow(0 4px 12px rgba(75, 75, 100, 0.10))",
                  }}
                  priority
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* スクロールインジケーター（SPのみ） */}
      <div className="absolute bottom-[56px] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 md:hidden animate-bounce">
        <span className="text-[9px] tracking-[0.2em] text-[#2d2d2d]/30">SCROLL</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#2d2d2d]/30">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
