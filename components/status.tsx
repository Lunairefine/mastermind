"use client";
import React from 'react';

interface StatusProps {
  score: number;
  time: string;
  isWin: boolean;
  onHome: () => void;
}

const Status: React.FC<StatusProps> = ({ score, time, isWin, onHome }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 p-6 backdrop-blur-sm select-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="flex-1" />

      <div className="w-full max-w-xs border border-white/20 rounded-3xl p-8 flex flex-col items-center justify-center bg-black shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        <h2 className={`text-2xl font-black tracking-[0.2em] mb-10 ${isWin ? 'text-white' : 'text-[#ff0000]'}`}>
          {isWin ? 'VICTORY' : 'GAME OVER'}
        </h2>

        <div className="flex flex-col items-center w-full gap-8">
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-400 font-bold tracking-widest text-xs uppercase">
                Time Taken
              </span>
              <span className={`text-3xl font-mono font-bold tracking-wider ${isWin ? 'text-[#00FF00]' : 'text-[#FF0000]'}`}>
                {time}
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-gray-400 font-bold tracking-widest text-xs uppercase">
                Total Score
              </span>
              <span className="text-8xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {score}
              </span>
            </div>

            {!isWin && (
                <p className="text-[#FF0000] text-sm font-semibold tracking-wide mt-2">
                    Better luck next time!
                </p>
            )}
        </div>
      </div>

      <div className="mt-12 w-full max-w-xs">
         <button 
            onClick={onHome}
            className="w-full bg-white text-black font-extrabold text-lg py-4 rounded-full hover:bg-gray-200 transition-all active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)] tracking-wide focus:outline-none"
        >
            BACK TO HOME
        </button>
      </div>

      <div className="flex-1" />

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