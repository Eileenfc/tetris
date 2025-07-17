'use client';

import React from 'react';

interface GameControlsProps {
  isPaused: boolean;
  isGameOver: boolean;
  isMuted: boolean;
  isPlayingMusic: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onToggleMute: () => void;
}

interface ControlButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

const ControlButton: React.FC<ControlButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'secondary',
  disabled = false 
}) => {
  const baseClasses = "w-full px-4 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-center";
  
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

export const GameControls: React.FC<GameControlsProps> = ({
  isPaused,
  isGameOver,
  isMuted,
  isPlayingMusic,
  onStart,
  onPause,
  onReset,
  onToggleMute
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
      <h3 className="text-white text-lg font-bold mb-4 text-center">Controles</h3>
      
      <div className="flex flex-col gap-3">
        {isGameOver ? (
          <ControlButton onClick={onStart} variant="primary">
            🎮 Nueva Partida
          </ControlButton>
        ) : (
          <ControlButton onClick={onPause} variant="primary">
            {isPaused ? '▶️ Continuar' : '⏸️ Pausar'}
          </ControlButton>
        )}
        
        <ControlButton onClick={onReset} variant="danger">
          🔄 Reiniciar
        </ControlButton>
        
        <ControlButton onClick={onToggleMute} variant="secondary">
          {isMuted ? '🔇 Activar Audio' : '🔊 Silenciar'}
        </ControlButton>
      </div>
      
      {/* Indicador de música */}
      {!isMuted && isPlayingMusic && (
        <div className="mt-3 p-2 bg-green-900/20 border border-green-700/30 rounded text-center">
          <span className="text-green-300 text-sm">
            🎵 Música reproduciendo
          </span>
        </div>
      )}
      
      {/* Instrucciones de controles */}
      <div className="mt-6 space-y-3">
        <h4 className="text-gray-300 text-sm font-semibold">Controles del Teclado:</h4>
        
        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-gray-400">
            <span>Mover:</span>
            <span>← → A D</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Bajar:</span>
            <span>↓ S</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Rotar:</span>
            <span>↑ W</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Caída rápida:</span>
            <span>Espacio</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Guardar pieza:</span>
            <span>C</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Pausar:</span>
            <span>P Esc</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Reiniciar:</span>
            <span>R</span>
          </div>
        </div>
      </div>
      
      {/* Consejos */}
      <div className="mt-6 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
        <h4 className="text-blue-300 text-sm font-semibold mb-2">💡 Consejos:</h4>
        <ul className="text-xs text-blue-200 space-y-1">
          <li>• Usa la pieza fantasma para planificar</li>
          <li>• Guarda piezas para situaciones difíciles</li>
          <li>• Completa líneas múltiples para más puntos</li>
          <li>• La velocidad aumenta cada 10 líneas</li>
        </ul>
      </div>
    </div>
  );
};
