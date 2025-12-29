// src/app/page.tsx
import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import ClientHome from '@/components/logicgame';

// Paksa render dinamis agar parameter selalu dibaca fresh
export const dynamic = 'force-dynamic';

// Definisi Tipe untuk Next.js 15/16 (Promise)
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // 1. KUNCI PERBAIKAN: Await dulu searchParams-nya
  const params = await searchParams;
  
  const score = params.score;
  const time = params.time;
  const user = params.user;

  // Debugging: Cek logs Vercel untuk memastikan data masuk
  console.log("METADATA PARAMS (Next.js 16):", { score, time, user });

  // 2. Base URL (Gunakan Env Var atau hardcode staging saat ini)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pre-mastermind.vercel.app';
  
  // 3. Jika tidak ada skor, return default
  if (!score) {
    return {};
  }

  // 4. Generate URL Gambar
  const ogImageUrl = `${baseUrl}/api/og?score=${score}&time=${time || '00:00'}&user=${user || 'PLAYER'}`;

  return {
    title: `Score: ${score} - Mastermind`,
    description: `Completed in ${time}. Can you beat my score?`,
    openGraph: {
      images: [ogImageUrl], 
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImageUrl],
    },
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: ogImageUrl,
        button: {
          title: "Play Now",
          action: {
            type: "launch_frame",
            name: "Mastermind",
            url: baseUrl,
            splashImageUrl: `${baseUrl}/media/images/syntax.png`,
            splashBackgroundColor: "#000000",
          },
        },
      }),
    }
  };
}

export default function Page() {
  return <ClientHome />;
}