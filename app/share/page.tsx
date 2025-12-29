"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import sdk from "@farcaster/miniapp-sdk";

export default function SharePage() {
  const params = useSearchParams();

  useEffect(() => {
    const score = params.get("score");
    const time = params.get("time");
    const user = params.get("user");

    if (!score || !time) return;

    const text =
      `I scored ${score} in ${time} playing Mastermind 🎯\n` +
      `Can you beat my score?`;

    const appUrl = window.location.origin + `/?score=${score}&time=${time}&user=${user}`;

    const encodedText = encodeURIComponent(text);
    const encodedEmbed = encodeURIComponent(appUrl);

    const isFarcaster =
      typeof sdk !== "undefined" &&
      sdk?.context !== undefined;

    if (isFarcaster) {
      window.location.replace(
        `https://farcaster.xyz/~/compose?text=${encodedText}&embeds[]=${encodedEmbed}`
      );
      return;
    }

    if (navigator.share) {
      navigator.share({
        title: "Mastermind Game",
        text,
        url: appUrl,
      });
      return;
    }

    window.location.replace(appUrl);
  }, [params]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      Sharing your score…
    </div>
  );
}
