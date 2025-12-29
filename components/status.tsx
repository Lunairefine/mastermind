"use client";

import React, { useEffect, useState } from "react";
import sdk from "@farcaster/miniapp-sdk";

interface StatusProps {
  score: number;
  time: string;
  isWin: boolean;
  onHome: () => void;
}

const Status: React.FC<StatusProps> = ({ score, time, isWin, onHome }) => {
  const [username, setUsername] = useState("player");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const context = await sdk.context;
        if (context?.user?.username) {
          setUsername(context.user.username);
        }
      } catch {}
    };
    loadUser();
  }, []);

  const handleShare = () => {
    const params = new URLSearchParams({
      score: score.toString(),
      time,
      user: username,
    });

    window.location.href = `/share?${params.toString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 p-6 backdrop-blur-sm select-none">
      <div className="flex-1" />

      <div className="w-full max-w-xs border border-white/20 rounded-3xl p-8 flex flex-col items-center justify-center bg-black">
        <h2 className={`text-2xl font-black tracking-[0.2em] mb-10 ${isWin ? "text-white" : "text-red-500"}`}>
          {isWin ? "VICTORY" : "GAME OVER"}
        </h2>

        <div className="flex flex-col items-center mb-6">
          <span className="text-xs tracking-widest">TIME</span>
          <span className={`text-2xl font-bold ${isWin ? "text-green-400" : "text-red-400"}`}>
            {time}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs tracking-widest">SCORE</span>
          <span className="text-7xl font-bold">{score}</span>
        </div>
      </div>

      <div className="mt-8 w-full max-w-xs flex gap-3 h-14">
        <button onClick={onHome} className="flex-grow bg-white text-black font-bold rounded-full">
          HOME
        </button>
        <button onClick={handleShare} className="aspect-square bg-blue-600 text-white rounded-2xl">
          ↗
        </button>
      </div>

      <div className="flex-1" />
    </div>
  );
};

export default Status;
