import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Lantern AI | AI-First Brand Analytics",
  description: "AI is the new search. Lantern is the new SEO. Reach millions of consumers turning to AI for product recommendations.",
  keywords: "AI analytics, AI visibility, brand optimization, AI SEO, AI recommendations",
  openGraph: {
    title: "Lantern AI | AI-First Brand Analytics",
    description: "AI is the new search. Lantern is the new SEO. Reach millions of consumers turning to AI for product recommendations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lantern AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lantern AI | AI-First Brand Analytics",
    description: "AI is the new search. Lantern is the new SEO. Reach millions of consumers turning to AI for product recommendations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}