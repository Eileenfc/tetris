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
  const baseClasses = "w-full px-4 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-center text-sm sm:text-base min-h-[48px] flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
    secondary: "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
    danger: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
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
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 shadow-xl">
      <h3 className="text-white text-lg font-bold mb-4 text-center">🎮 Controles</h3>
      
      <div className="space-y-3">
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
        <h4 className="text-gray-300 text-sm font-semibold flex items-center gap-2">
          <span>⌨️</span>
          Controles del Teclado:
        </h4>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between text-gray-400 bg-gray-900/50 p-2 rounded">
            <span>Mover:</span>
            <span className="font-mono">← → A D</span>
          </div>
          <div className="flex justify-between text-gray-400 bg-gray-900/50 p-2 rounded">
            <span>Bajar:</span>
            <span className="font-mono">↓ S</span>
          </div>
          <div className="flex justify-between text-gray-400 bg-gray-900/50 p-2 rounded">
            <span>Rotar:</span>
            <span className="font-mono">↑ W</span>
          </div>
          <div className="flex justify-between text-gray-400 bg-gray-900/50 p-2 rounded">
            <span>Caída rápida:</span>
            <span className="font-mono">Espacio</span>
          </div>
          <div className="flex justify-between text-gray-400 bg-gray-900/50 p-2 rounded">
            <span>Guardar:</span>
            <span className="font-mono">C</span>
          </div>
          <div className="flex justify-between text-gray-400 bg-gray-900/50 p-2 rounded">
            <span>Pausar:</span>
            <span className="font-mono">P Esc</span>
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
