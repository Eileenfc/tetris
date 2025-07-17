'use client';

import React from 'react';
import { CellType, Tetromino, COLORS } from '@/types/tetris';
import { getGhostPosition, placeTetromino } from '@/utils/tetris';

interface BoardProps {
  board: CellType[][];
  currentPiece: Tetromino | null;
  showGhost?: boolean;
}

interface CellProps {
  type: CellType;
  isGhost?: boolean;
}

const Cell: React.FC<CellProps> = ({ type, isGhost = false }) => {
  const baseClasses = "w-6 h-6 border border-gray-700 transition-all duration-150";
  const colorClass = COLORS[type as keyof typeof COLORS] || COLORS[0];
  const ghostClass = isGhost ? "opacity-30" : "";
  
  return (
    <div 
      className={`${baseClasses} ${colorClass} ${ghostClass}`}
      style={{
        boxShadow: type !== 0 && !isGhost ? 'inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.1)' : 'none'
      }}
    />
  );
};

export const Board: React.FC<BoardProps> = ({ 
  board, 
  currentPiece, 
  showGhost = true 
}) => {
  // Crear una copia del tablero para renderizar
  let renderBoard = board.map(row => [...row]);
  
  // Agregar la pieza fantasma
  if (currentPiece && showGhost) {
    const ghostPosition = getGhostPosition(board, currentPiece);
    const ghostPiece = { ...currentPiece, position: ghostPosition };
    
    for (let y = 0; y < ghostPiece.shape.length; y++) {
      for (let x = 0; x < ghostPiece.shape[y].length; x++) {
        if (ghostPiece.shape[y][x] !== 0) {
          const boardY = ghostPiece.position.y + y;
          const boardX = ghostPiece.position.x + x;
          
          if (
            boardY >= 0 && 
            boardY < board.length && 
            boardX >= 0 && 
            boardX < board[0].length &&
            renderBoard[boardY][boardX] === 0
          ) {
            renderBoard[boardY][boardX] = -1 as CellType; // Valor especial para ghost
          }
        }
      }
    }
  }
  
  // Agregar la pieza actual
  if (currentPiece) {
    renderBoard = placeTetromino(renderBoard, currentPiece);
  }
  
  return (
    <div className="bg-gray-900 p-2 rounded-lg border-2 border-gray-600">
      <div 
        className="grid gap-px bg-gray-800 p-1 rounded"
        style={{ 
          gridTemplateColumns: `repeat(${board[0]?.length || 10}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${board.length}, minmax(0, 1fr))`
        }}
      >
        {renderBoard.map((row, y) =>
          row.map((cell, x) => (
            <Cell 
              key={`${x}-${y}`} 
              type={cell === -1 ? currentPiece?.color || 0 : cell} 
              isGhost={cell === -1}
            />
          ))
        )}
      </div>
    </div>
  );
};
