'use client';

import React, { useEffect, useState } from 'react';
import { Board } from './Board';
import { PiecePreview } from './PiecePreview';
import { GameStatsComponent } from './GameStats';
import { GameControls } from './GameControls';
import { MusicVisualizer } from './MusicVisualizer';
import { useTetris } from '@/hooks/useTetris';

export const TetrisGame: React.FC = () => {
  const {
    gameState,
    startGame,
    resetGame,
    togglePause,
    toggleMute,
    isMuted,
    isPlayingMusic
  } = useTetris();

  const [gameTime, setGameTime] = useState(0);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);

  // Contador de tiempo del juego
  useEffect(() => {
    if (!gameState.isGameOver && !gameState.isPaused) {
      if (!gameStartTime) {
        setGameStartTime(Date.now());
      }
      
      const interval = setInterval(() => {
        if (gameStartTime) {
          setGameTime(Math.floor((Date.now() - gameStartTime) / 1000));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState.isGameOver, gameState.isPaused, gameStartTime]);

  // Reiniciar el tiempo cuando se inicia un nuevo juego
  useEffect(() => {
    if (!gameState.isGameOver && gameState.score === 0 && gameState.lines === 0) {
      setGameTime(0);
      setGameStartTime(Date.now());
    }
  }, [gameState.isGameOver, gameState.score, gameState.lines]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🎮TETRIS🎮
          </h1>
          <p className="text-gray-300 text-lg">¡El clásico juego de bloques para tu campamento de verano!</p>
          <p className="text-gray-400 text-sm mt-2">
             Un proyecto de Hack Club Summer | 🎵 Con música y efectos de sonido
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 items-start">
          {/* Panel izquierdo - Estadísticas y Hold */}
          <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
            <GameStatsComponent
              score={gameState.score}
              level={gameState.level}
              lines={gameState.lines}
              time={gameTime}
            />
            
            <PiecePreview
              piece={gameState.holdPiece}
              title="Pieza Guardada"
            />
          </div>

          {/* Panel central - Tablero del juego */}
          <div className="lg:col-span-2 flex flex-col items-center space-y-4 order-1 lg:order-2">
            {/* Overlays del juego */}
            <div className="relative">
              <Board
                board={gameState.board}
                currentPiece={gameState.currentPiece}
                showGhost={true}
              />
              
              {/* Overlay de pausa */}
              {gameState.isPaused && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="text-6xl mb-4">⏸️</div>
                    <div className="text-white text-2xl font-bold mb-2">PAUSADO</div>
                    <div className="text-gray-300">Presiona P o Esc para continuar</div>
                  </div>
                </div>
              )}
              
              {/* Overlay de game over */}
              {gameState.isGameOver && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💀</div>
                    <div className="text-red-400 text-3xl font-bold mb-2">GAME OVER</div>
                    <div className="text-white text-lg mb-4">
                      Puntuación Final: {gameState.score.toLocaleString()}
                    </div>
                    <div className="text-gray-300 mb-4">
                      Nivel: {gameState.level} | Líneas: {gameState.lines}
                    </div>
                    <button
                      onClick={startGame}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      🎮 Jugar de Nuevo
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mensaje de estado */}
            {!gameState.isGameOver && !gameState.isPaused && (
              <div className="text-center text-gray-300">
                {gameState.level === 0 && gameState.lines === 0 && (
                  <p className="text-lg">¡Comenzemos! Usa las flechas o WASD para jugar</p>
                )}
              </div>
            )}
          </div>

          {/* Panel derecho - Siguiente pieza y controles */}
          <div className="lg:col-span-1 space-y-4 order-3">
            <PiecePreview
              piece={gameState.nextPiece}
              title="Siguiente Pieza"
            />
            
            <GameControls
              isPaused={gameState.isPaused}
              isGameOver={gameState.isGameOver}
              isMuted={isMuted()}
              isPlayingMusic={isPlayingMusic()}
              onStart={startGame}
              onPause={togglePause}
              onReset={resetGame}
              onToggleMute={toggleMute}
            />
            
            <MusicVisualizer
              isPlaying={isPlayingMusic()}
              isMuted={isMuted()}
            />
          </div>
        </div>

        {/* Footer con información adicional */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>
            🏕️ Creado para <a 
              href="https://summer.hackclub.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              Hack Club Summer
            </a> con ❤️
          </p>
          <p className="mt-1">
            Usando Next.js, TypeScript y Tailwind CSS
          </p>
          <p className="mt-1">
            Versión: 1.0.0 | 
            <span className="ml-2">🎵 Disfruta jugando en tu campamento de verano</span>
          </p>
          <div className="mt-2 flex justify-center items-center space-x-4">
            <span className="text-xs text-gray-500">
              🔥 Hecho por hackers, para hackers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
