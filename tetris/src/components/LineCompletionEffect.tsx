'use client';

import React, { useEffect, useState } from 'react';

interface LineCompletionEffectProps {
  completedLines: number[];
  onAnimationComplete: () => void;
}

export const LineCompletionEffect: React.FC<LineCompletionEffectProps> = ({
  completedLines,
  onAnimationComplete
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (completedLines.length > 0) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onAnimationComplete();
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [completedLines, onAnimationComplete]);

  if (!isVisible || completedLines.length === 0) return null;

  const getLineText = (count: number) => {
    switch (count) {
      case 1: return "SINGLE! +40";
      case 2: return "DOUBLE! +100";
      case 3: return "TRIPLE! +300";
      case 4: return "TETRIS! +1200";
      default: return `${count} LÍNEAS!`;
    }
  };

  const getLineColor = (count: number) => {
    switch (count) {
      case 1: return "text-green-400";
      case 2: return "text-blue-400";
      case 3: return "text-purple-400";
      case 4: return "text-yellow-400";
      default: return "text-white";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className={`
        text-center transform transition-all duration-500 ease-out
        ${isVisible ? 'scale-100 opacity-100' : 'scale-150 opacity-0'}
      `}>
        <div className={`
          text-6xl font-bold mb-2 
          ${getLineColor(completedLines.length)}
          animate-pulse
        `}>
          {getLineText(completedLines.length)}
        </div>
        {completedLines.length === 4 && (
          <div className="text-2xl text-yellow-300 animate-bounce">
            🎉 ¡INCREÍBLE! 🎉
          </div>
        )}
      </div>
    </div>
  );
};
