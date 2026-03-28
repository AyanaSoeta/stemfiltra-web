import type { Metadata } from "next";
import {
  Noto_Sans_JP,
  Noto_Serif_JP,
  Shippori_Mincho,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
  preload: false,
});

const notoSerifJP = Noto_Serif_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-serif-jp",
  preload: false,
});

const shipporiMincho = Shippori_Mincho({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-shippori-mincho",
  preload: false,
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zen-kaku-gothic-new",
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stemfiltra.com";

export const metadata: Metadata = {
  title: {
    default: "Stem Filtra Activation | 幹細胞由来エクソソーム濾液",
    template: "%s | Stem Filtra Activation",
  },
  description:
    "幹細胞由来エクソソーム濾液を使用した次世代エイジングケア。国内CPC施設で精製された高純度エクソソーム濾液を経鼻吸収で届ける新発想のエイジングケア製品です。本製品は医薬品ではありません。",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Stem Filtra Activation",
    title: "Stem Filtra Activation | 幹細胞由来エクソソーム濾液",
    description:
      "国内CPC施設で精製された高純度エクソソーム濾液を経鼻吸収で届ける新発想のエイジングケア製品。",
    images: [
      {
        url: "/images/product-package.png",
        width: 1200,
        height: 630,
        alt: "Stem Filtra Activation 製品パッケージ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stem Filtra Activation | 幹細胞由来エクソソーム濾液",
    description:
      "国内CPC施設で精製された高純度エクソソーム濾液を経鼻吸収で届ける新発想のエイジングケア製品。",
    images: ["/images/product-package.png"],
  },
  keywords: [
    "エクソソーム",
    "幹細胞",
    "エクソソーム濾液",
    "エイジングケア",
    "経鼻吸収",
    "Stem Filtra Activation",
    "幹細胞由来",
    "エクソソーム 美容",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Stem Filtra Activation",
              description:
                "幹細胞由来エクソソーム濾液を使用した次世代エイジングケア製品。国内CPC施設にて精製。",
              brand: {
                "@type": "Brand",
                name: "Stem Filtra Activation",
              },
              manufacturer: {
                "@type": "Organization",
                name: "一般社団法人 健康事業支援機構",
              },
              category: "エイジングケア",
              image: `${siteUrl}/images/product-package.png`,
              url: siteUrl,
            }),
          }}
        />
      </head>
      <body className={`${notoSansJP.variable} ${notoSerifJP.variable} ${shipporiMincho.variable} ${zenKakuGothicNew.variable}`}>
        {/* ── 薬機法表記バー：全ページ共通ヘッダー ── */}
        <div
          style={{
            background: "rgba(8, 8, 10, 0.97)",
            borderBottom: "1px solid rgba(168, 216, 234, 0.12)",
            position: "sticky",
            top: 0,
            zIndex: 9999,
          }}
        >
          <div
            style={{
              maxWidth: "1152px",
              margin: "0 auto",
              padding: "7px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "2px 10px",
                border: "1px solid rgba(168, 216, 234, 0.30)",
                borderRadius: "999px",
                fontSize: "9px",
                letterSpacing: "0.18em",
                color: "rgba(168, 216, 234, 0.70)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              非医薬品
            </span>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "rgba(255, 255, 255, 0.38)",
                textAlign: "center",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              本製品は医薬品・医療機器ではありません。疾病の診断・治療・予防を目的としたものではありません。
            </p>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
