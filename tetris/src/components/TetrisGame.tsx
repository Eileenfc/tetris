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
        <div className="text-center mb-6 lg:mb-8">
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
              🎮 TETRIS 🎮
            </h1>
            <div className="absolute -top-2 -right-2 animate-pulse">
              <span className="text-yellow-400 text-xl">⭐</span>
            </div>
            <div className="absolute -top-1 -left-2 animate-bounce">
              <span className="text-orange-400 text-lg">🔥</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-200 text-lg sm:text-xl font-medium">
              ¡El clásico juego de bloques que nunca pasa de moda!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-sm">
              <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-400/30">
                <span className="text-orange-300">🏕️</span>
                <span className="text-orange-200 font-semibold">Proyecto de Hack Club Summer</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
                <span className="text-blue-300">🎵</span>
                <span className="text-blue-200 font-semibold">Con música y efectos épicos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-3 lg:gap-4 items-start">
          {/* Panel izquierdo - Estadísticas y Hold */}
          <div className="xl:col-span-1 lg:col-span-1 space-y-3 order-2 lg:order-1">
            <GameStatsComponent
              score={gameState.score}
              level={gameState.level}
              lines={gameState.lines}
              time={gameTime}
            />
            
            <PiecePreview
              piece={gameState.holdPiece}
              title="Pieza Guardada"
              size={4}
            />
          </div>

          {/* Panel central - Tablero del juego */}
          <div className="xl:col-span-2 lg:col-span-2 flex flex-col items-center space-y-3 order-1 lg:order-2">
            {/* Overlays del juego */}
            <div className="relative w-fit mx-auto">
              <Board
                board={gameState.board}
                currentPiece={gameState.currentPiece}
                showGhost={true}
              />
              
              {/* Overlay de pausa */}
              {gameState.isPaused && (
                <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center rounded-lg z-10">
                  <div className="text-center p-6 bg-gray-800/90 rounded-xl border border-gray-600 shadow-2xl">
                    <div className="text-6xl mb-4 animate-pulse">⏸️</div>
                    <div className="text-white text-2xl font-bold mb-2">PAUSADO</div>
                    <div className="text-gray-300 text-sm">Presiona P o Esc para continuar</div>
                    <div className="text-gray-400 text-xs mt-2">¡Descansa un momento, hacker!</div>
                  </div>
                </div>
              )}
              
              {/* Overlay de game over */}
              {gameState.isGameOver && (
                <div className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center rounded-lg z-10">
                  <div className="text-center p-8 bg-gray-800/95 rounded-xl border border-red-500/50 shadow-2xl max-w-sm mx-4">
                    <div className="text-6xl mb-4 animate-bounce">💀</div>
                    <div className="text-red-400 text-3xl font-bold mb-3">GAME OVER</div>
                    <div className="text-white text-lg mb-4">
                      Puntuación Final: <span className="font-bold text-yellow-400">{gameState.score.toLocaleString()}</span>
                    </div>
                    <div className="text-gray-300 mb-4 space-y-1">
                      <div>🏆 Nivel: <span className="font-semibold">{gameState.level}</span></div>
                      <div>📏 Líneas: <span className="font-semibold">{gameState.lines}</span></div>
                      <div>⏱️ Tiempo: <span className="font-semibold">{Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}</span></div>
                    </div>
                    <button
                      onClick={startGame}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      🎮 ¡Jugar de Nuevo!
                    </button>
                    <div className="text-orange-400 text-xs mt-3">
                      🏕️ ¡Sigue hackeando en Hack Club Summer!
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mensaje de estado */}
            {!gameState.isGameOver && !gameState.isPaused && (
              <div className="text-center text-gray-300 px-4">
                {gameState.level === 0 && gameState.lines === 0 && (
                  <div className="space-y-2">
                    <p className="text-lg sm:text-xl font-medium">¡Comenzemos a hackear bloques!</p>
                    <p className="text-sm text-gray-400">Usa las flechas, WASD o los controles táctiles</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Panel derecho - Siguiente pieza y controles */}
          <div className="xl:col-span-1 lg:col-span-1 space-y-3 order-3">
            <PiecePreview
              piece={gameState.nextPiece}
              title="Siguiente Pieza"
              size={4}
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
        <div className="mt-6 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Badge principal */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-full px-4 py-2 mb-3">
                <span className="text-orange-300 text-sm font-semibold">🏕️ Proyecto de</span>
                <a 
                  href="https://summer.hackclub.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-200 hover:text-orange-100 font-bold transition-colors underline decoration-orange-400"
                >
                  Hack Club Summer
                </a>
              </div>
            </div>

            {/* Características */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              <div className="flex items-center justify-center gap-2 bg-gray-800/50 rounded-lg p-2 border border-gray-700/50">
                <span className="text-blue-400">🎵</span>
                <span className="text-gray-300 text-sm">Música y efectos de sonido</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-gray-800/50 rounded-lg p-2 border border-gray-700/50">
                <span className="text-green-400">⚡</span>
                <span className="text-gray-300 text-sm">Controles fluidos y responsivos</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-gray-800/50 rounded-lg p-2 border border-gray-700/50">
                <span className="text-purple-400">👻</span>
                <span className="text-gray-300 text-sm">Pieza fantasma para planificar</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-gray-800/50 rounded-lg p-2 border border-gray-700/50">
                <span className="text-yellow-400">💾</span>
                <span className="text-gray-300 text-sm">Sistema de guardado de piezas</span>
              </div>
            </div>

            {/* Info técnica y créditos */}
            <div className="text-center space-y-2">
              <p className="text-gray-400 text-xs">
                Construido con 
                <span className="text-blue-400 font-semibold mx-1">Next.js</span>
                +
                <span className="text-blue-400 font-semibold mx-1">TypeScript</span>
                +
                <span className="text-cyan-400 font-semibold mx-1">Tailwind CSS</span>
              </p>
              <div className="flex flex-wrap justify-center items-center gap-3 text-xs">
                <span className="text-gray-500">v1.0.0</span>
                <span className="text-gray-600">•</span>
                <span className="text-orange-400">🔥 Hecho por hackers, para hackers</span>
                <span className="text-gray-600">•</span>
                <a 
                  href="https://github.com/Eileenfc/tetris" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors underline decoration-green-400/50 hover:decoration-green-300"
                >
                  🚀 Open Source
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
