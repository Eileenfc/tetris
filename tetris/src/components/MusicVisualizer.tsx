'use client';

import React, { useEffect, useState } from 'react';

interface MusicVisualizerProps {
  isPlaying: boolean;
  isMuted: boolean;
}

export const MusicVisualizer: React.FC<MusicVisualizerProps> = ({ 
  isPlaying, 
  isMuted 
}) => {
  const [bars, setBars] = useState<number[]>(new Array(8).fill(0));

  useEffect(() => {
    if (!isPlaying || isMuted) {
      setBars(new Array(8).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 100));
    }, 200);

    return () => clearInterval(interval);
  }, [isPlaying, isMuted]);

  if (!isPlaying && !isMuted) return null;

  return (
    <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
      <h3 className="text-white text-sm font-bold mb-2 text-center">
        🎵 Visualizador
      </h3>
      <div className="flex justify-center items-end space-x-1 h-12">
        {bars.map((height, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-blue-500 to-cyan-400 w-2 rounded-t transition-all duration-200"
            style={{ 
              height: isMuted ? '4px' : `${Math.max(4, height * 0.4)}px`,
              opacity: isMuted ? 0.3 : 1
            }}
          />
        ))}
      </div>
      <div className="text-center mt-2">
        <span className="text-xs text-gray-400">
          {isMuted ? 'Silenciado' : isPlaying ? 'Reproduciendo' : 'Pausado'}
        </span>
      </div>
    </div>
  );
};
