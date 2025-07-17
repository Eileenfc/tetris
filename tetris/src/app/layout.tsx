import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Tetris - Hack Club Summer | Juego Clásico Online",
  description: "¡Juega al clásico Tetris online! Proyecto creado para Hack Club Summer. Diviértete con este adictivo juego de bloques con música y efectos de sonido. ¡Gratis y sin descargas!",
  keywords: "tetris, juego, online, gratis, bloques, puzzle, clásico, arcade, hack club, summer, campamento",
  authors: [{ name: "Hack Club Summer Camper" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Tetris - Hack Club Summer",
    description: "El clásico juego de Tetris creado para Hack Club Summer. ¡Juega gratis online!",
    type: "website",
    locale: "es_ES",
    siteName: "Tetris - Hack Club Summer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tetris - Hack Club Summer",
    description: "¡Juega al clásico Tetris online! Proyecto de Hack Club Summer.",
  }
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
      </body>
    </html>
  );
}
