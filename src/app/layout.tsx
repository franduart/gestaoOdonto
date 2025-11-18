
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://gestao-odonto.com"),
  title: {
    default: "GestãoOdonto – Agendamentos odontológicos rápidos e fáceis",
    template: "%s | GestãoOdonto"
  },
  description:
    "Agende consultas odontológicas em minutos. Compare dentistas, veja preços atualizados e escolha o profissional ideal para você. Prático, rápido e seguro.",
  
  keywords: [
    "dentista",
    "agendamento odontológico",
    "odontologia",
    "gestão clínica",
    "clínica odontológica",
    "dentista perto de mim",
    "consulta odontológica",
    "sistema odontológico",
    "gestão odonto"
  ],

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },

  alternates: {
    canonical: process.env.NEXT_PUBLIC_URL
  },

  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "GestãoOdonto",
    title: "GestãoOdonto – Encontre os melhores dentistas",
    description:
      "Encontre os melhores dentistas, compare preços e marque sua consulta online em poucos minutos.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}/dentista.jpg`,
        width: 1200,
        height: 630,
        alt: "Dentista sorrindo e atendendo paciente"
      }
    ],
    locale: "pt_BR"
  },

  twitter: {
    card: "summary_large_image",
    title: "GestãoOdonto – Agende seu dentista em minutos",
    description:
      "Compare profissionais e marque sua consulta odontológica de forma simples e rápida.",
    images: [`${process.env.NEXT_PUBLIC_URL}/dentista.jpg`]
  },

  category: "saúde"
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
