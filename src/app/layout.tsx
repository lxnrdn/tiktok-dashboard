import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TikTok Fashion Trend Tracker",
  description:
    "Dashboard analisis produk trending fashion TikTok Shop Indonesia untuk affiliator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="bg-[#0a0a0f] text-zinc-200 antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-0 md:ml-64 min-h-screen">
            <div className="p-4 md:p-6 lg:p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
