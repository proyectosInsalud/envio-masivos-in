import type { Metadata } from "next";
import { Lato, Poppins } from "next/font/google";
import "./globals.css";
import 'aos/dist/aos.css';

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Envio de Mensajes Masivos",
  description: "Envio de Mensajes Masivos",
};

'use client';

import { useEffect } from 'react';
import AOS from 'aos';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${lato.variable} ${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
