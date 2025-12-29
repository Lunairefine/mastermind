"use client";

import React, { useState } from 'react';
import Landing from '@/components/landing';
import Gameboard from '@/components/gameboard';
import Status from '@/components/status';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export default function ClientHome() {
  const [view, setView] = useState<'landing' | 'game' | 'result'>('landing');
  const [result, setResult] = useState({ win: false, time: '', score: 0 });

  return (
    <main className={`${poppins.variable} font-poppins min-h-screen bg-black text-white`}>
      {view === 'landing' && (
        <Landing onStart={() => setView('game')} />
      )}

      {view === 'game' && (
        <Gameboard onGameOver={(win, time, score) => {
          setResult({ win, time, score });
          setView('result');
        }} />
      )}

      {view === 'result' && (
        <Status 
          isWin={result.win} 
          time={result.time} 
          score={result.score}
          onHome={() => setView('landing')} 
        />
      )}
    </main>
  );
}