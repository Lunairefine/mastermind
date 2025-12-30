"use client";
import React, { useState, useEffect } from 'react';

const COLORS = ['red', 'yellow', 'green', 'blue', 'pink', 'cyan'] as const;
type Color = typeof COLORS[number];

const GUESS_STYLES: Record<Color, string> = {
  red:    'bg-[#FF0000] border-[#FF0000] shadow-[0_0_10px_rgba(255,0,0,0.5)]',
  yellow: 'bg-[#FFFF00] border-[#FFFF00] shadow-[0_0_10px_rgba(255,255,0,0.5)]',
  green:  'bg-[#00FF00] border-[#00FF00] shadow-[0_0_10px_rgba(0,255,0,0.5)]',
  blue:   'bg-[#0000FF] border-[#0000FF] shadow-[0_0_10px_rgba(0,0,255,0.5)]',
  pink:   'bg-[#FF00FF] border-[#FF00FF] shadow-[0_0_10px_rgba(255,0,255,0.5)]',
  cyan:   'bg-[#00FFFF] border-[#00FFFF] shadow-[0_0_10px_rgba(0,255,255,0.5)]',
};

const CLUE_STYLES = {
  correctPos:   'bg-[#00FF00] border-[#00FF00]',
  correctColor: 'bg-white border-white',
  empty:        'bg-transparent border border-gray-600',
};

const CODE_LENGTH = 4;
const MAX_ROWS = 8;

interface GameboardProps {
  onGameOver: (isWin: boolean, time: string, score: number) => void;
}

interface RowState {
  guesses: (Color | null)[];
  feedback: ('correct-pos' | 'correct-color' | null)[];
}

const Gameboard: React.FC<GameboardProps> = ({ onGameOver }) => {
  const [secretCode, setSecretCode] = useState<Color[]>([]);
  const [rows, setRows] = useState<RowState[]>(
    Array(MAX_ROWS).fill(null).map(() => ({
      guesses: Array(CODE_LENGTH).fill(null),
      feedback: []
    }))
  );
  
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const newCode = Array.from({ length: CODE_LENGTH }, () => COLORS[Math.floor(Math.random() * COLORS.length)]);
    setSecretCode(newCode);

    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePegClick = (rowIndex: number, colIndex: number) => {
    if (rowIndex !== activeRowIndex || !selectedColor) return;
    const newRows = [...rows];
    const newGuesses = [...newRows[rowIndex].guesses];
    newGuesses[colIndex] = selectedColor;
    newRows[rowIndex] = { ...newRows[rowIndex], guesses: newGuesses };
    setRows(newRows);
  };

  const checkPattern = () => {
    const currentRow = rows[activeRowIndex];
    if (currentRow.guesses.includes(null)) return;

    const currentGuess = currentRow.guesses as Color[];
    let tempSecret = [...secretCode];
    let tempGuess = [...currentGuess];
    let correctPos = 0;
    let correctColor = 0;

    for (let i = 0; i < CODE_LENGTH; i++) {
      if (tempGuess[i] === tempSecret[i]) {
        correctPos++;
        tempSecret[i] = null as any;
        tempGuess[i] = null as any;
      }
    }

    for (let i = 0; i < CODE_LENGTH; i++) {
      if (tempGuess[i] !== null) {
        const foundIdx = tempSecret.indexOf(tempGuess[i]);
        if (foundIdx > -1) {
          correctColor++;
          tempSecret[foundIdx] = null as any;
        }
      }
    }

    const feedbackArray = [
        ...Array(correctPos).fill('correct-pos'),
        ...Array(correctColor).fill('correct-color')
    ];

    const newRows = [...rows];
    newRows[activeRowIndex] = { ...newRows[activeRowIndex], feedback: feedbackArray };
    setRows(newRows);

    if (correctPos === CODE_LENGTH) {
      const remainingRows = MAX_ROWS - (activeRowIndex + 1);
      const score = remainingRows * 10;
      onGameOver(true, formatTime(seconds), score);
    } else if (activeRowIndex >= MAX_ROWS - 1) {
      onGameOver(false, formatTime(seconds), 0);
    } else {
      setActiveRowIndex(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-md mx-auto bg-black font-sans overflow-hidden select-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <div className="flex justify-between items-end px-6 py-3 border-b border-gray-800 bg-black z-10 shrink-0 h-[60px]">
        <span className="text-[#ff0000] font-bold text-lg tracking-widest font-mono leading-none">
          {formatTime(seconds)}
        </span>
        <span className="text-gray-500 font-bold text-xs tracking-widest leading-none mb-1">
          CHANCE {activeRowIndex + 1}/{MAX_ROWS}
        </span>
      </div>
      <div className="flex-1 w-full px-6 py-2 flex flex-col justify-center min-h-0">
        <div className="flex flex-col-reverse justify-between h-full w-full">
            {rows.map((row, rIndex) => {
            const isActive = rIndex === activeRowIndex;
            const isFuture = rIndex > activeRowIndex;
            
            return (
                <div 
                  key={rIndex} 
                  className={`flex items-center justify-between w-full h-[11%] transition-all duration-300 ${isFuture ? 'opacity-30' : 'opacity-100'}`}
                >
                <div className="flex gap-4 h-full items-center"> 
                    {row.guesses.map((color, cIndex) => (
                    <div
                        key={cIndex}
                        onClick={() => handlePegClick(rIndex, cIndex)}
                        className={`
                        aspect-square h-full max-h-[50px] w-auto
                        rounded-full transition-all duration-200 box-border
                        ${color ? GUESS_STYLES[color] : 'bg-transparent border border-white'} 
                        ${isActive ? 'cursor-pointer hover:border-gray-300' : ''}
                        `}
                    />
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-1.5 h-[60%] aspect-square">
                    {[0, 1, 2, 3].map((i) => {
                    const type = row.feedback[i];
                    let clueClass = CLUE_STYLES.empty;
                    if (type === 'correct-pos') clueClass = CLUE_STYLES.correctPos;
                    if (type === 'correct-color') clueClass = CLUE_STYLES.correctColor;

                    return (
                        <div key={i} className={`w-full h-full rounded-full ${clueClass}`} />
                    );
                    })}
                </div>
                </div>
            );
            })}
        </div>
      </div>

      <div className="bg-black border-t border-gray-800 px-6 py-4 z-20 shrink-0 flex flex-col gap-4 justify-center pb-8">
        <div className="flex justify-between items-center px-1">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`
                w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200 border-2 focus:outline-none
                ${GUESS_STYLES[color]}
                ${selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110' : 'opacity-100'}
              `}
              aria-label={`Select ${color}`}
            />
          ))}
        </div>

        <button
          onClick={checkPattern}
          className="w-full bg-white text-black font-extrabold text-lg py-3 rounded-full hover:bg-gray-200 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] tracking-wider focus:outline-none"
        >
          CHECK PATTERN
        </button>
      </div>
    </div>
  );
};

export default Gameboard;