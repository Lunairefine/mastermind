"use client";
import React from 'react';
import Header from '@/components/header'; 

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-md mx-auto p-6 bg-black text-white relative select-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FF0000] shadow-[0_0_15px_#FF0000]" />
            <div className="w-9 h-9 rounded-full bg-[#FFFF00] shadow-[0_0_15px_#FFFF00]" />
            <div className="w-9 h-9 rounded-full bg-[#00FF00] shadow-[0_0_15px_#00FF00]" />
            <div className="w-9 h-9 rounded-full bg-[#0000FF] shadow-[0_0_15px_#0000FF]" />
            <div className="w-9 h-9 rounded-full bg-[#FF00FF] shadow-[0_0_15px_#FF00FF]" />
            <div className="w-9 h-9 rounded-full bg-[#00FFFF] shadow-[0_0_15px_#00FFFF]" />
        </div>

        <h1 className="text-4xl font-bold text-white tracking-[0.1em] drop-shadow-xl text-center">
          MASTERMIND
        </h1>
      </div>

      <div className="w-full mb-8">
        <button 
          onClick={onStart}
          className="w-full bg-white text-black font-extrabold text-lg py-4 rounded-full hover:bg-gray-200 transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] tracking-wide focus:outline-none"
        >
          START GAME
        </button>
      </div>
    </div>
  );
};

export default Landing;