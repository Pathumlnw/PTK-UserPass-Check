import "./globals.css";
import { ReactNode } from "react";
import localFont from "next/font/local";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PTK Schedule Viewer",
  description: "Check the school schedule for PathumThepWittayakarn School",
  openGraph: {
    title: "PTK Schedule Viewer",
    description: "Check the school schedule for PathumThepWittayakarn School",
    url: "https://ptk-schedule-viewer.vercel.app", // Replace with your real domain
    siteName: "PTK Schedule Viewer",
    images: [
      {
        url: "/preview-image.png", // Replace with the actual image URL
        width: 1200,
        height: 630,
        alt: "PTK Schedule Viewer Preview",
      },
    ],
    type: "website",
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "PTK Schedule Viewer",
    description: "Check the school schedule for PathumThepWittayakarn School",
    images: ["/preview-image.png"], // Replace with the actual image URL
  },
};

const anakotmaiFont = localFont({
  src: [
    {
      path: "/fonts/anakotmai-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "/fonts/anakotmai-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/anakotmai-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th" className={anakotmaiFont.className}>
      <body className="min-h-screen text-white overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-[#F89EBA] to-[#7F7FDB] animate-gradient-x"></div>
        <div className="fixed inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-white/20 animate-float"
          style={{
            width: `${Math.random() * 100 + 20}px`,
            height: `${Math.random() * 100 + 20}px`,
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.3 + 0.1,
            filter: 'blur(8px)'
          }}
        />
          ))}
        </div>
        <div className="fixed inset-0 bg-grid-white/25 pointer-events-none"></div>
        <main className="container mx-auto min-h-screen flex flex-col bg-transparent relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
