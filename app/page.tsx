import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import ClientHome from '@/components/logicgame';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Cek apakah ada parameter 'score' di URL
  const score = searchParams.score;
  const time = searchParams.time;

  // JIKA TIDAK ADA SKOR (User baru buka halaman utama)
  // Kita return kosong, biar dia pakai default dari layout.tsx (frame.png)
  if (!score) {
    return {};
  }

  // JIKA ADA SKOR (User membuka link share)
  // Kita override gambarnya ke status.png
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mastermind-baseapp.vercel.app';
  const statusImageUrl = `${baseUrl}/media/status.png`;

  return {
    title: `I scored ${score} in Mastermind!`,
    description: `Completed in ${time}. Can you beat my score?`,
    openGraph: {
      images: [statusImageUrl], // Override frame.png -> status.png
    },
    twitter: {
      card: 'summary_large_image',
      images: [statusImageUrl],
    },
    other: {
      // Override gambar Frame Farcaster juga
      "fc:frame:image": statusImageUrl,
      // Opsional: Ubah tombol jadi "Play Now" daripada "Launch"
      "fc:frame:button:1": "Try to Beat Score",
    }
  }
}

export default function Page() {
  return <ClientHome />;
}