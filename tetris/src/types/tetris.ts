export type CellType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | -1;

export interface Position {
  x: number;
  y: number;
}

export interface Tetromino {
  shape: number[][];
  color: CellType;
  position: Position;
}

export interface GameState {
  board: CellType[][];
  currentPiece: Tetromino | null;
  nextPiece: Tetromino | null;
  holdPiece: Tetromino | null;
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  isPaused: boolean;
  canHold: boolean;
}

export interface GameStats {
  score: number;
  level: number;
  lines: number;
  time: number;
}

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const PREVIEW_SIZE = 4;

export const TETROMINO_SHAPES = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: 1 as CellType
  },
  O: {
    shape: [
      [2, 2],
      [2, 2]
    ],
    color: 2 as CellType
  },
  T: {
    shape: [
      [0, 3, 0],
      [3, 3, 3],
      [0, 0, 0]
    ],
    color: 3 as CellType
  },
  S: {
    shape: [
      [0, 4, 4],
      [4, 4, 0],
      [0, 0, 0]
    ],
    color: 4 as CellType
  },
  Z: {
    shape: [
      [5, 5, 0],
      [0, 5, 5],
      [0, 0, 0]
    ],
    color: 5 as CellType
  },
  J: {
    shape: [
      [6, 0, 0],
      [6, 6, 6],
      [0, 0, 0]
    ],
    color: 6 as CellType
  },
  L: {
    shape: [
      [0, 0, 7],
      [7, 7, 7],
      [0, 0, 0]
    ],
    color: 7 as CellType
  }
};

export const COLORS = {
  0: 'bg-gray-900', // Vacío
  1: 'bg-cyan-400',   // I
  2: 'bg-yellow-400', // O
  3: 'bg-purple-500', // T
  4: 'bg-green-400',  // S
  5: 'bg-red-500',    // Z
  6: 'bg-blue-500',   // J
  7: 'bg-orange-500', // L
  [-1]: 'bg-gray-600' // Pieza fantasma
};

export const LINES_PER_LEVEL = 10;
export const INITIAL_DROP_TIME = 1000; // ms
export const MIN_DROP_TIME = 50; // ms
