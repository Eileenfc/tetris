'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  GameState,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  INITIAL_DROP_TIME,
  LINES_PER_LEVEL
} from '@/types/tetris';
import {
  createEmptyBoard,
  getRandomTetromino,
  isValidPosition,
  placeTetromino,
  clearLines,
  calculateScore,
  calculateLevel,
  calculateDropTime,
  performWallKick,
  isGameOver as checkGameOver
} from '@/utils/tetris';
import { useTetrisAudio } from './useTetrisAudio';

export const useTetris = () => {
  const {
    playMovementSound,
    playRotationSound,
    playDropSound,
    playLineClearSound,
    playGameOverSound,
    playLevelUpSound,
    startBackgroundMusic,
    stopBackgroundMusic,
    toggleMute,
    isMuted,
    isPlayingMusic
  } = useTetrisAudio();

  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: null,
    holdPiece: null,
    score: 0,
    level: 0,
    lines: 0,
    isGameOver: false,
    isPaused: false,
    canHold: true
  });

  const [dropTime, setDropTime] = useState(INITIAL_DROP_TIME);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const lastDropTime = useRef(Date.now());

  // Inicializar el juego
  const startGame = useCallback(() => {
    const currentPiece = getRandomTetromino();
    const nextPiece = getRandomTetromino();
    
    setGameState({
      board: createEmptyBoard(),
      currentPiece,
      nextPiece,
      holdPiece: null,
      score: 0,
      level: 0,
      lines: 0,
      isGameOver: false,
      isPaused: false,
      canHold: true
    });
    
    setDropTime(INITIAL_DROP_TIME);
    
    // Iniciar música de fondo
    setTimeout(() => {
      startBackgroundMusic();
    }, 500);
  }, [startBackgroundMusic]);

  // Reiniciar el juego
  const resetGame = useCallback(() => {
    startGame();
  }, [startGame]);

  // Pausar/reanudar el juego
  const togglePause = useCallback(() => {
    setGameState(prev => {
      const newPauseState = !prev.isPaused;
      if (newPauseState) {
        stopBackgroundMusic();
      } else {
        startBackgroundMusic();
      }
      return { ...prev, isPaused: newPauseState };
    });
  }, [startBackgroundMusic, stopBackgroundMusic]);

  // Mover pieza hacia abajo
  const dropPiece = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;

      const newPosition = { x: prev.currentPiece.position.x, y: prev.currentPiece.position.y + 1 };

      if (isValidPosition(prev.board, prev.currentPiece, newPosition)) {
        return {
          ...prev,
          currentPiece: { ...prev.currentPiece, position: newPosition }
        };
      } else {
        // La pieza no puede moverse más, colocarla en el tablero
        playDropSound();
        const newBoard = placeTetromino(prev.board, prev.currentPiece);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        
        // Reproducir sonido de líneas completadas
        if (linesCleared > 0) {
          playLineClearSound(linesCleared);
        }
        
        const newLines = prev.lines + linesCleared;
        const newLevel = calculateLevel(newLines);
        const newScore = prev.score + calculateScore(linesCleared, prev.level);
        
        // Reproducir sonido de subida de nivel
        if (newLevel > prev.level) {
          playLevelUpSound();
        }
        
        const nextPiece = prev.nextPiece || getRandomTetromino();
        const newCurrentPiece = getRandomTetromino();
        
        // Verificar game over
        const gameOver = checkGameOver(clearedBoard, nextPiece);
        
        if (gameOver) {
          playGameOverSound();
          stopBackgroundMusic();
        }
        
        return {
          ...prev,
          board: clearedBoard,
          currentPiece: gameOver ? null : nextPiece,
          nextPiece: gameOver ? null : newCurrentPiece,
          score: newScore,
          level: newLevel,
          lines: newLines,
          isGameOver: gameOver,
          canHold: true
        };
      }
    });
  }, [playDropSound, playLineClearSound, playLevelUpSound, playGameOverSound, stopBackgroundMusic]);

  // Mover pieza horizontalmente
  const movePiece = useCallback((direction: 'left' | 'right') => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;

      const dx = direction === 'left' ? -1 : 1;
      const newPosition = { x: prev.currentPiece.position.x + dx, y: prev.currentPiece.position.y };

      if (isValidPosition(prev.board, prev.currentPiece, newPosition)) {
        playMovementSound();
        return {
          ...prev,
          currentPiece: { ...prev.currentPiece, position: newPosition }
        };
      }

      return prev;
    });
  }, [playMovementSound]);

  // Rotar pieza
  const rotatePiece = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;

      const rotatedPiece = performWallKick(prev.board, prev.currentPiece);
      
      if (rotatedPiece) {
        playRotationSound();
        return {
          ...prev,
          currentPiece: rotatedPiece
        };
      }

      return prev;
    });
  }, [playRotationSound]);

  // Caída rápida (hard drop)
  const hardDrop = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;

      let newY = prev.currentPiece.position.y;
      while (isValidPosition(prev.board, prev.currentPiece, { x: prev.currentPiece.position.x, y: newY + 1 })) {
        newY++;
      }

      const droppedPiece = { ...prev.currentPiece, position: { ...prev.currentPiece.position, y: newY } };
      const newBoard = placeTetromino(prev.board, droppedPiece);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      
      const newLines = prev.lines + linesCleared;
      const newLevel = calculateLevel(newLines);
      const baseScore = calculateScore(linesCleared, prev.level);
      const hardDropBonus = (newY - prev.currentPiece.position.y) * 2;
      const newScore = prev.score + baseScore + hardDropBonus;
      
      const nextPiece = prev.nextPiece || getRandomTetromino();
      const newCurrentPiece = getRandomTetromino();
      
      const gameOver = checkGameOver(clearedBoard, nextPiece);
      
      return {
        ...prev,
        board: clearedBoard,
        currentPiece: gameOver ? null : nextPiece,
        nextPiece: gameOver ? null : newCurrentPiece,
        score: newScore,
        level: newLevel,
        lines: newLines,
        isGameOver: gameOver,
        canHold: true
      };
    });
  }, []);

  // Función hold (guardar pieza)
  const holdPiece = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused || !prev.canHold) return prev;

      if (prev.holdPiece) {
        const newHoldPiece = { ...prev.currentPiece, position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 } };
        const newCurrentPiece = { ...prev.holdPiece, position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 } };
        
        return {
          ...prev,
          currentPiece: newCurrentPiece,
          holdPiece: newHoldPiece,
          canHold: false
        };
      } else {
        const newHoldPiece = { ...prev.currentPiece, position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 } };
        const newCurrentPiece = prev.nextPiece || getRandomTetromino();
        const newNextPiece = getRandomTetromino();
        
        return {
          ...prev,
          currentPiece: newCurrentPiece,
          nextPiece: newNextPiece,
          holdPiece: newHoldPiece,
          canHold: false
        };
      }
    });
  }, []);

  // Controles del teclado
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.isGameOver) return;

    switch (event.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        event.preventDefault();
        movePiece('left');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        event.preventDefault();
        movePiece('right');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        event.preventDefault();
        dropPiece();
        break;
      case 'ArrowUp':
      case 'w':
      case 'W':
        event.preventDefault();
        rotatePiece();
        break;
      case ' ':
        event.preventDefault();
        hardDrop();
        break;
      case 'c':
      case 'C':
        event.preventDefault();
        holdPiece();
        break;
      case 'p':
      case 'P':
      case 'Escape':
        event.preventDefault();
        togglePause();
        break;
      case 'r':
      case 'R':
        event.preventDefault();
        resetGame();
        break;
    }
  }, [gameState.isGameOver, movePiece, dropPiece, rotatePiece, hardDrop, holdPiece, togglePause, resetGame]);

  // Loop principal del juego
  useEffect(() => {
    if (gameState.isGameOver || gameState.isPaused) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    const newDropTime = calculateDropTime(gameState.level);
    if (newDropTime !== dropTime) {
      setDropTime(newDropTime);
    }

    gameLoopRef.current = setInterval(() => {
      const now = Date.now();
      if (now - lastDropTime.current >= dropTime) {
        dropPiece();
        lastDropTime.current = now;
      }
    }, 16); // 60 FPS

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    };
  }, [gameState.isGameOver, gameState.isPaused, gameState.level, dropTime, dropPiece]);

  // Event listeners para el teclado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Inicializar el juego al montar el componente
  useEffect(() => {
    startGame();
  }, [startGame]);

  return {
    gameState,
    startGame,
    resetGame,
    togglePause,
    movePiece,
    rotatePiece,
    dropPiece,
    hardDrop,
    holdPiece,
    // Funciones de audio
    toggleMute,
    isMuted,
    isPlayingMusic
  };
};
