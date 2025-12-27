export type Color = 'red' | 'yellow' | 'green' | 'blue' | 'pink' | 'cyan';
export type CellColor = Color | null;
export type FeedbackType = 'correct-pos' | 'correct-color' | null;

export interface RowData {
  guesses: CellColor[];
  feedback: FeedbackType[];
}

export type GameStatus = 'landing' | 'playing' | 'won' | 'lost';