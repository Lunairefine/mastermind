import type { Metadata, ResolvingMetadata } from 'next';
import ClientHome from '@/components/logicgame';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getParam = (value?: string | string[]) =>
  Array.isArray(value) ? value[0] : value;

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await searchParams;
  
  const score = getParam(params.score);
  const time = getParam(params.time) ?? '00:00';
  const user = getParam(params.user) ?? 'PLAYER';

  const appUrl = process.env.NEXT_PUBLIC_APP_URL 
    ? (process.env.NEXT_PUBLIC_APP_URL.startsWith('http') ? process.env.NEXT_PUBLIC_APP_URL : `https://${process.env.NEXT_PUBLIC_APP_URL}`)
    : 'https://mastermind-baseapp.vercel.app';

  const title = score ? `Score: ${score} - Mastermind` : 'Mastermind Game';
  const description = score 
    ? `I completed Mastermind in ${time}. Can you beat my score?` 
    : 'A simple yet challenging color puzzle game.';

  const ogImageUrl = score
    ? `${appUrl}/api/og?score=${encodeURIComponent(score)}&time=${encodeURIComponent(time)}&user=${encodeURIComponent(user)}`
    : `${appUrl}/media/frame.png`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: appUrl,
      siteName: "Mastermind",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Mastermind Result",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImageUrl],
    },
  };
}

export default function Page() {
  return <ClientHome />;
}