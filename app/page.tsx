// src/app/page.tsx
import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import ClientHome from '@/components/logicgame';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

// Generate Metadata di Server
export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const score = searchParams.score;
  const time = searchParams.time;
  const user = searchParams.user;

  // 1. JIKA TIDAK ADA SKOR (Halaman Utama)
  // Biarkan kosong, nanti otomatis pakai default dari layout.tsx (frame.png)
  if (!score) {
    return {}; 
  }

  // 2. JIKA ADA SKOR (Link Share)
  // Gunakan API Route untuk generate gambar dinamis
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://pre-mastermind.vercel.app';
  
  // NOTE: Gunakan API OG agar angkanya berubah sesuai skor
  // Jika Anda pakai status.png statis, ganti baris ini jadi: const imageUrl = `${baseUrl}/media/status.png`;
  const imageUrl = `${baseUrl}/api/og?score=${score}&time=${time}&user=${user}`;

  return {
    title: `Score: ${score} - Mastermind`,
    description: `Completed in ${time}. Can you beat my score?`,
    openGraph: {
      images: [imageUrl], // Override gambar WA/Twitter
    },
    twitter: {
      card: 'summary_large_image',
      images: [imageUrl],
    },
    other: {
      // PENTING: Override Frame Farcaster secara manual
      // Kita harus recreate JSON string-nya agar Farcaster membacanya sebagai frame baru
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: imageUrl, // <--- GAMBAR SKOR DISINI
        button: {
          title: "Try to Beat Score", // Ubah tombol jadi ajakan main
          action: {
            type: "launch_frame",
            name: "Mastermind Baseapp",
            url: baseUrl,
            splashImageUrl: `${baseUrl}/media/images/syntax.png`,
            splashBackgroundColor: "#000000",
          },
        },
      }),
    }
  };
}

// Render Client Component (Game)
export default function Page() {
  return <ClientHome />;
}