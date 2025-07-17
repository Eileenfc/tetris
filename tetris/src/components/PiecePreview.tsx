'use client';

import React from 'react';
import { Tetromino, COLORS, PREVIEW_SIZE } from '@/types/tetris';

interface PiecePreviewProps {
  piece: Tetromino | null;
  title: string;
  size?: number;
}

const PiecePreview: React.FC<PiecePreviewProps> = ({ 
  piece, 
  title, 
  size = 4 
}) => {
  return (
    <div className="bg-gray-800 p-3 rounded-lg border border-gray-600 min-w-fit">
      <h3 className="text-white text-sm font-bold mb-3 text-center">{title}</h3>
      <div className="flex justify-center">
        <div className="bg-gray-900 rounded p-2">
          {!piece ? (
            <div className="grid grid-cols-4 grid-rows-4 gap-0">
              {Array(16).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className="w-6 h-6 border border-gray-700/15" 
                />
              ))}
            </div>
          ) : (
            <div 
              className="grid gap-0"
              style={{
                gridTemplateColumns: `repeat(${piece.shape[0]?.length || 4}, 24px)`,
                gridTemplateRows: `repeat(${piece.shape.length}, 24px)`
              }}
            >
              {piece.shape.flat().map((cell, i) => {
                const isBlock = cell !== 0;
                const colorClass = isBlock ? COLORS[piece.color as keyof typeof COLORS] || COLORS[0] : '';
                
                return (
                  <div
                    key={i}
                    className={`${colorClass} ${isBlock ? '' : 'border border-gray-700/15'}`}
                    style={{
                      width: '24px',
                      height: '24px',
                      boxShadow: isBlock ? 'inset -1px -1px 2px rgba(0,0,0,0.3), inset 1px 1px 2px rgba(255,255,255,0.1)' : 'none',
                      margin: 0,
                      padding: 0
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      {!piece && (
        <div className="text-center mt-1">
          <span className="text-gray-500 text-xs">Sin pieza</span>
        </div>
      )}
    </div>
  );
};

// Memoizar el componente para evitar re-renders innecesarios
export const MemoizedPiecePreview = React.memo(PiecePreview, (prevProps, nextProps) => {
  // Solo re-renderizar si la pieza realmente cambió
  if (!prevProps.piece && !nextProps.piece) return true;
  if (!prevProps.piece || !nextProps.piece) return false;
  
  // Comparar las propiedades importantes de la pieza
  return (
    prevProps.title === nextProps.title &&
    JSON.stringify(prevProps.piece.shape) === JSON.stringify(nextProps.piece.shape) &&
    prevProps.piece.color === nextProps.piece.color
  );
});

export { MemoizedPiecePreview as PiecePreview };
