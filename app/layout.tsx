import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import AITutor from "@/components/AITutor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Python para el Futuro Digital",
  description: "Aprende Python con Inteligencia Artificial. Curso MOOC interactivo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <AITutor code="" consoleOutput={[]} />
        <Script src="https://cdn.jsdelivr.net/pyodide/v0.29.3/full/pyodide.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
