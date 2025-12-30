"use client";
import React, { useEffect, useState } from 'react';
import sdk from '@farcaster/miniapp-sdk';

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
      } catch {
      }
    };
    loadUser();
  }, []);

  const handleShare = () => {
    const appUrl = new URL(window.location.href);
    appUrl.searchParams.set('score', score.toString());
    appUrl.searchParams.set('time', time);
    appUrl.searchParams.set('user', username);
    appUrl.searchParams.set('t', Date.now().toString());

    const text = `My score is ${score} in ${time} time in Mastermind Game\nCan you do better?`;
    const encodedText = encodeURIComponent(text);
    const encodedEmbed = encodeURIComponent(appUrl.toString());

    window.open(`https://farcaster.xyz/~/compose?text=${encodedText}&embeds[]=${encodedEmbed}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 p-6 backdrop-blur-sm select-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="flex-1" />
      <div className="w-full max-w-xs border border-white/20 rounded-3xl p-8 flex flex-col items-center justify-center bg-black shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        <h2 className={`text-2xl font-black tracking-[0.2em] mb-10 ${isWin ? 'text-white' : 'text-[#ff0000]'}`}>
          {isWin ? 'VICTORY' : 'GAME OVER'}
        </h2>
        <div className="flex flex-col items-center gap-1 mb-6">
          <span className="text-white font-bold tracking-widest text-xs uppercase">TIME :</span>
          <span className={`text-2xl font-bold tracking-wider ${isWin ? 'text-[#00FF00]' : 'text-[#FF0000]'}`}>
            {time}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 mb-4">
          <span className="text-white font-bold tracking-widest text-xs uppercase">SCORE :</span>
          <span className="text-7xl font-bold text-white tracking-tighter">
            {score}
          </span>
        </div>
      </div>

      <div className="mt-8 w-full max-w-xs flex gap-3 h-14">
        <button
          onClick={onHome}
          className="flex-grow bg-white text-black font-extrabold text-lg rounded-full hover:bg-gray-200 transition-all active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)] focus:outline-none uppercase tracking-wide"
        >
          HOME
        </button>
        <button
          onClick={handleShare}
          className="aspect-square h-full bg-[#0052FF] text-white flex items-center justify-center rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-[0_0_15px_rgba(0,82,255,0.4)] focus:outline-none"
          aria-label="Share Score"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </button>
      </div>

      <div className="flex-1" />
      <div className="text-center pb-4 opacity-40">
        <p className="text-[10px] text-white font-mono tracking-widest uppercase">
          Created by lunairefine
        </p>
        <p className="text-[10px] text-gray-400 font-mono mt-1">
          ver 0.2.0
        </p>
      </div>
    </div>
  );
};

export default Status;