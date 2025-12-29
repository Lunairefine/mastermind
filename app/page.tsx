import type { Metadata } from 'next';
import ClientHome from '@/components/logicgame';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const getParam = (value?: string | string[]) =>
  Array.isArray(value) ? value[0] : value;

export async function generateMetadata(
  { searchParams }: Props
): Promise<Metadata> {
  const score = getParam(searchParams.score);
  const time = getParam(searchParams.time) ?? '00:00';
  const user = getParam(searchParams.user) ?? 'PLAYER';

  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.startsWith('http')
    ? process.env.NEXT_PUBLIC_APP_URL
    : `https://${process.env.NEXT_PUBLIC_APP_URL ?? 'pre-mastermind.vercel.app'}`;

  if (!score) {
    return {
      title: 'Mastermind Game',
      description: 'Test your logic and beat the score',
    };
  }

  const ogImageUrl =
    `${appUrl}/api/og` +
    `?score=${encodeURIComponent(score)}` +
    `&time=${encodeURIComponent(time)}` +
    `&user=${encodeURIComponent(user)}`;

  return {
    title: `Score ${score} · Mastermind`,
    description: `Completed in ${time}. Can you beat my score?`,
    openGraph: {
      title: `Score ${score} · Mastermind`,
      description: `Completed in ${time}`,
      images: [ogImageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Score ${score} · Mastermind`,
      description: `Completed in ${time}`,
      images: [ogImageUrl],
    },
  };
}

export default function Page() {
  return <ClientHome />;
}
