'use client';

import React from 'react';
import { GameStats } from '@/types/tetris';

interface GameStatsProps {
  score: number;
  level: number;
  lines: number;
  time?: number;
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => (
  <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
    <div className="flex items-center justify-between mb-1">
      <span className="text-gray-400 text-xs uppercase tracking-wide">{label}</span>
      {icon && <span className="text-lg">{icon}</span>}
    </div>
    <div className="text-white text-xl font-bold">{value}</div>
  </div>
);

export const GameStatsComponent: React.FC<GameStatsProps> = ({ 
  score, 
  level, 
  lines, 
  time 
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatScore = (score: number): string => {
    return score.toLocaleString();
  };

  return (
    <div className="space-y-3">
      <h2 className="text-white text-lg font-bold text-center mb-4">Estadísticas</h2>
      
      <StatCard 
        label="Puntuación" 
        value={formatScore(score)} 
        icon="🏆"
      />
      
      <StatCard 
        label="Nivel" 
        value={level} 
        icon="📈"
      />
      
      <StatCard 
        label="Líneas" 
        value={lines} 
        icon="📏"
      />
      
      {time !== undefined && (
        <StatCard 
          label="Tiempo" 
          value={formatTime(time)} 
          icon="⏱️"
        />
      )}
      
      {/* Información adicional */}
      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
        <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-2">Progreso</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Próximo nivel:</span>
            <span className="text-white">{((level + 1) * 10) - lines} líneas</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(lines % 10) * 10}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
