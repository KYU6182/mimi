import type { Metadata, Viewport } from "next";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mimi-omega-rust.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "mimi | 普通の女の子が、誰かの推しになる場所。",
  description:
    "まだ有名じゃない、かわいいあの子を見つけて応援できるZ世代向けWEB雑誌・モデルコミュニティ。",
  openGraph: {
    siteName: "mimi",
    title: "mimi | 普通の女の子が、誰かの推しになる場所。",
    description:
      "まだ有名じゃない、かわいいあの子を見つけて応援できるZ世代向けWEB雑誌・モデルコミュニティ。",
    images: ["/images/hero.png"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBF6F3"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
