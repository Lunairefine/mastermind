import { redirect } from "next/navigation";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const getParam = (v?: string | string[]) =>
  Array.isArray(v) ? v[0] : v;

export default function SharePage({ searchParams }: Props) {
  const score = getParam(searchParams.score) ?? "0";
  const time = getParam(searchParams.time) ?? "00:00";
  const user = getParam(searchParams.user) ?? "player";

  const text = `My score is ${score} in ${time} time in Mastermind Game\nCan you do better?`;

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL?.startsWith("http")
      ? process.env.NEXT_PUBLIC_APP_URL
      : `https://${process.env.NEXT_PUBLIC_APP_URL ?? "pre-mastermind.vercel.app"}`;

  const embedUrl = `${appUrl}?score=${encodeURIComponent(score)}&time=${encodeURIComponent(time)}&user=${encodeURIComponent(user)}`;

  const ua = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase() : "";

  if (ua.includes("farcaster")) {
    redirect(
      `https://farcaster.xyz/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrl)}`
    );
  }

  if (ua.includes("base")) {
    redirect(
      `https://base.app/share?text=${encodeURIComponent(text)}&url=${encodeURIComponent(embedUrl)}`
    );
  }

  redirect(
    `https://farcaster.xyz/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrl)}`
  );
}
