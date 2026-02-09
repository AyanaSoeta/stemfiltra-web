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
  title: "Stem Filtra Activation | エクソソーム点鼻薬",
  description:
    "脳からめぐるエクソソームの真価。幹細胞由来エクソソーム濾液を使用した次世代エイジングケア。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${notoSerifJP.variable} ${shipporiMincho.variable} ${zenKakuGothicNew.variable}`}>
        {children}
      </body>
    </html>
  );
}
