import { 
  TETROMINO_SHAPES, 
  BOARD_WIDTH, 
  BOARD_HEIGHT, 
  CellType, 
  Tetromino, 
  Position 
} from '@/types/tetris';

export const createEmptyBoard = (): CellType[][] => {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
};

export const getRandomTetromino = (): Tetromino => {
  const shapes = Object.values(TETROMINO_SHAPES);
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  
  return {
    shape: randomShape.shape.map(row => [...row]),
    color: randomShape.color,
    position: { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(randomShape.shape[0].length / 2), y: 0 }
  };
};

export const rotateTetromino = (tetromino: Tetromino): Tetromino => {
  const rotated = tetromino.shape[0].map((_, index) =>
    tetromino.shape.map(row => row[index]).reverse()
  );
  
  return {
    ...tetromino,
    shape: rotated
  };
};

export const isValidPosition = (
  board: CellType[][],
  tetromino: Tetromino,
  newPosition: Position
): boolean => {
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x] !== 0) {
        const newX = newPosition.x + x;
        const newY = newPosition.y + y;
        
        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX] !== 0)
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

export const placeTetromino = (board: CellType[][], tetromino: Tetromino): CellType[][] => {
  const newBoard = board.map(row => [...row]);
  
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x] !== 0) {
        const boardY = tetromino.position.y + y;
        const boardX = tetromino.position.x + x;
        
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = tetromino.color;
        }
      }
    }
  }
  
  return newBoard;
};

export const clearLines = (board: CellType[][]): { newBoard: CellType[][]; linesCleared: number } => {
  const newBoard: CellType[][] = [];
  let linesCleared = 0;
  
  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (board[y].every(cell => cell !== 0)) {
      linesCleared++;
    } else {
      newBoard.unshift([...board[y]]);
    }
  }
  
  // Rellenar las líneas vacías en la parte superior
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(0));
  }
  
  return { newBoard, linesCleared };
};

export const calculateScore = (linesCleared: number, level: number): number => {
  const baseScores = [0, 40, 100, 300, 1200];
  return baseScores[linesCleared] * (level + 1);
};

export const calculateLevel = (lines: number): number => {
  return Math.floor(lines / 10);
};

export const calculateDropTime = (level: number): number => {
  return Math.max(50, 1000 - (level * 50));
};

export const getGhostPosition = (board: CellType[][], tetromino: Tetromino): Position => {
  let ghostY = tetromino.position.y;
  
  while (isValidPosition(board, tetromino, { x: tetromino.position.x, y: ghostY + 1 })) {
    ghostY++;
  }
  
  return { x: tetromino.position.x, y: ghostY };
};

export const canRotate = (board: CellType[][], tetromino: Tetromino): boolean => {
  const rotated = rotateTetromino(tetromino);
  return isValidPosition(board, rotated, tetromino.position);
};

export const performWallKick = (
  board: CellType[][],
  tetromino: Tetromino
): Tetromino | null => {
  const rotated = rotateTetromino(tetromino);
  
  // Intentar diferentes posiciones para el wall kick
  const offsets = [
    { x: 0, y: 0 },   // Sin movimiento
    { x: -1, y: 0 },  // Izquierda
    { x: 1, y: 0 },   // Derecha
    { x: 0, y: -1 },  // Arriba
    { x: -1, y: -1 }, // Diagonal izquierda-arriba
    { x: 1, y: -1 }   // Diagonal derecha-arriba
  ];
  
  for (const offset of offsets) {
    const newPosition = {
      x: tetromino.position.x + offset.x,
      y: tetromino.position.y + offset.y
    };
    
    if (isValidPosition(board, rotated, newPosition)) {
      return {
        ...rotated,
        position: newPosition
      };
    }
  }
  
  return null;
};

export const isGameOver = (board: CellType[][], tetromino: Tetromino): boolean => {
  return !isValidPosition(board, tetromino, tetromino.position);
};
