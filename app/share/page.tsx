"use client";

import { useEffect } from "react";

export default function SharePage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const score = params.get("score") ?? "0";
    const time = params.get("time") ?? "00:00";
    const user = params.get("user") ?? "player";

    const text = `My score is ${score} in ${time} time in Mastermind Game\nCan you do better?`;

    const appUrl = window.location.origin;
    const embedUrl = `${appUrl}?score=${score}&time=${time}&user=${user}&t=${Date.now()}`;

    const encodedText = encodeURIComponent(text);
    const encodedEmbed = encodeURIComponent(embedUrl);

    const ua = navigator.userAgent.toLowerCase();

    if (ua.includes("farcaster")) {
      window.location.href =
        `https://farcaster.xyz/~/compose?text=${encodedText}&embeds[]=${encodedEmbed}`;
      return;
    }

    if (ua.includes("base")) {
      window.location.href =
        `https://base.app/share?text=${encodedText}&url=${encodedEmbed}`;
      return;
    }

    window.location.href =
      `https://farcaster.xyz/~/compose?text=${encodedText}&embeds[]=${encodedEmbed}`;
  }, []);

  return null;
}
