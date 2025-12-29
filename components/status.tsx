"use client";
import React from 'react';

interface StatusProps {
  score: number;
  time: string;
  isWin: boolean;
  onHome: () => void;
}

const Status: React.FC<StatusProps> = ({ score, time, isWin, onHome }) => {
  
  const handleShare = () => {
    // 1. Ambil data user dari LocalStorage/Context (Contoh dummy jika belum ada)
    // Di real app, Anda ambil dari context Farcaster user
    const username = "user"; 

    // 2. Buat URL Aplikasi saat ini + Parameter Skor
    // Ini agar saat link dishare, OG Image-nya berubah sesuai skor
    const appUrl = new URL(window.location.href);
    appUrl.searchParams.set('score', score.toString());
    appUrl.searchParams.set('time', time);
    appUrl.searchParams.set('user', username);

    // 3. Siapkan Teks Share
    const text = `My score is ${score} in ${time} time in Mastermind Game\nCan you do better?`;
    
    // 4. Encode URL untuk Warpcast
    const encodedText = encodeURIComponent(text);
    const encodedEmbed = encodeURIComponent(appUrl.toString());
    
    // 5. Buka Warpcast Compose
    window.open(`https://warpcast.com/~/compose?text=${encodedText}&embeds[]=${encodedEmbed}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 p-6 backdrop-blur-sm select-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
      
      {/* Spacer Atas */}
      <div className="flex-1" />

      {/* --- BOX UTAMA --- */}
      <div className="w-full max-w-xs border border-white/20 rounded-3xl p-8 flex flex-col items-center justify-center bg-black shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        <h2 className={`text-2xl font-black tracking-[0.2em] mb-10 ${isWin ? 'text-white' : 'text-[#ff0000]'}`}>
          {isWin ? 'VICTORY' : 'GAME OVER'}
        </h2>

        <div className="flex flex-col items-center w-full gap-8">
            {/* TIME */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-400 font-bold tracking-widest text-xs uppercase">
                Time Taken
              </span>
              <span className={`text-3xl font-mono font-bold tracking-wider ${isWin ? 'text-[#00FF00]' : 'text-[#FF0000]'}`}>
                {time}
              </span>
            </div>

            {/* SCORE */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-gray-400 font-bold tracking-widest text-xs uppercase">
                Total Score
              </span>
              <span className="text-8xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {score}
              </span>
            </div>
        </div>
      </div>

      {/* --- TOMBOL AKSI (HOME & SHARE) --- */}
      <div className="mt-12 w-full max-w-xs flex gap-4">
         {/* Tombol HOME (Putih) */}
         <button 
            onClick={onHome}
            className="flex-1 bg-white text-black font-extrabold text-lg py-4 rounded-full hover:bg-gray-200 transition-all active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)] tracking-wide focus:outline-none"
        >
            HOME
        </button>

        {/* Tombol SHARE (Biru) - Icon Panah */}
        <button 
            onClick={handleShare}
            className="w-16 flex items-center justify-center bg-[#0052FF] text-white font-extrabold text-lg py-4 rounded-full hover:bg-blue-600 transition-all active:scale-95 shadow-[0_0_15px_rgba(0,82,255,0.4)] focus:outline-none"
            aria-label="Share Score"
        >
            {/* Icon Panah Miring Kanan Atas (SVG) */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
        </button>
      </div>

      {/* Spacer Bawah */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="text-center pb-4 opacity-40">
        <p className="text-[10px] text-white font-mono tracking-widest uppercase">
          Created by lunairefine
        </p>
        <p className="text-[10px] text-gray-400 font-mono mt-1">
          ver 0.1.0
        </p>
      </div>

    </div>
  );
};

export default Status;