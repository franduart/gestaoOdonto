
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionAuthProvider from "@/components/session-auth";
import {Toaster} from 'sonner'
import {QueryClientContext} from '@/providers/queryClint'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GestãoOdonto- Agende em minutos",
  description: "Compare profissionais, confira preços e escolha o dentista ideal para você. Rápido, seguro e sem complicação",
  robots:{
    index: true,
    follow: true,
    nocache: true,
  },
  openGraph:{
    title: "GestãoOdonto- Agende em minutos",
    description: 'Encontre os melhores dentistas em um só lugar',
    images:[`${process.env.NEXT_PUBLIC_URL}/dentista.jpg`]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}>
        <SessionAuthProvider>
          <QueryClientContext>
          <Toaster
          duration={2500}
          />
          {children}
          </QueryClientContext>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
