import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import ClientHome from '@/components/logicgame';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await searchParams;

  const score = params.score;
  const time = params.time;
  const user = params.user;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL
    ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
    : 'https://mastermind-baseapp.vercel.app';

  if (!score) {
    return {};
  }

  const ogImageUrl = `${appUrl}/api/og?score=${score}&time=${time || '00:00'}&user=${user || 'PLAYER'}`;

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
          title: "Play Game",
          action: {
            type: "launch_frame",
            name: "Mastermind",
            url: appUrl,
            splashImageUrl: `${appUrl}/media/icon.png`,
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