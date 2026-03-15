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

export const metadata: Metadata = {
  title: "Stem Filtra Activation | 幹細胞由来エクソソーム濾液",
  description:
    "幹細胞由来エクソソーム濾液を使用した次世代エイジングケア。本製品は医薬品ではありません。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
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
