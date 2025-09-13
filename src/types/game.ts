export type CellValue = 'X' | 'O' | null;
export type Board = CellValue[];
export type GameStatus = 'playing' | 'won' | 'lost' | 'draw';

export interface STEMQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: 'math' | 'science' | 'technology' | 'engineering';
  difficulty: 'grade6-8' | 'grade9-10' | 'grade11-12';
  explanation?: string;
}

export interface GameState {
  board: Board;
  currentPlayer: 'X' | 'O';
  status: GameStatus;
  score: {
    player: number;
    computer: number;
    draws: number;
  };
  questionsAnswered: number;
  correctAnswers: number;
}