'use client';

import React from 'react';
import { Tetromino, COLORS, PREVIEW_SIZE } from '@/types/tetris';

interface PiecePreviewProps {
  piece: Tetromino | null;
  title: string;
  size?: number;
}

export const PiecePreview: React.FC<PiecePreviewProps> = ({ 
  piece, 
  title, 
  size = PREVIEW_SIZE 
}) => {
  // Crear un grid vacío para la vista previa
  const previewGrid = Array(size).fill(null).map(() => Array(size).fill(0));
  
  // Si hay una pieza, centrarla en el grid
  if (piece) {
    const offsetX = Math.floor((size - piece.shape[0].length) / 2);
    const offsetY = Math.floor((size - piece.shape.length) / 2);
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] !== 0) {
          const previewY = offsetY + y;
          const previewX = offsetX + x;
          
          if (previewY >= 0 && previewY < size && previewX >= 0 && previewX < size) {
            previewGrid[previewY][previewX] = piece.color;
          }
        }
      }
    }
  }
  
  return (
    <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
      <h3 className="text-white text-sm font-bold mb-2 text-center">{title}</h3>
      <div 
        className="grid gap-px bg-gray-900 p-1 rounded"
        style={{ 
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`
        }}
      >
        {previewGrid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`w-4 h-4 border border-gray-700 ${COLORS[cell as keyof typeof COLORS] || COLORS[0]}`}
              style={{
                boxShadow: cell !== 0 ? 'inset -1px -1px 2px rgba(0,0,0,0.3), inset 1px 1px 2px rgba(255,255,255,0.1)' : 'none'
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};
