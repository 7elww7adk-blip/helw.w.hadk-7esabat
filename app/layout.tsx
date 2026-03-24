import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "نظام إدارة الفروع",
  description: "إدارة محاسبية وتشغيلية ودليفري متعددة الفروع"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
