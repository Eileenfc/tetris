'use client';

import { useCallback, useEffect, useRef } from 'react';

export const useTetrisAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isMutedRef = useRef(false);
  const backgroundMusicRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isPlayingMusicRef = useRef(false);

  // Inicializar el contexto de audio
  useEffect(() => {
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Audio no disponible:', error);
    }

    return () => {
      stopBackgroundMusic();
    };
  }, []);

  // Función para crear tonos
  const createTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'square') => {
    if (!audioContextRef.current || isMutedRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration);

      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + duration);
    } catch (error) {
      console.warn('Error reproduciendo sonido:', error);
    }
  }, []);

  // Música de fondo
  const startBackgroundMusic = useCallback(() => {
    if (!audioContextRef.current || isMutedRef.current || isPlayingMusicRef.current) return;

    try {
      // Crear nodo de ganancia para el volumen de la música
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.setValueAtTime(0.02, audioContextRef.current.currentTime); // Volumen bajo
      gainNodeRef.current.connect(audioContextRef.current.destination);

      isPlayingMusicRef.current = true;
      playTetrisTheme();
    } catch (error) {
      console.warn('Error iniciando música de fondo:', error);
    }
  }, []);

  const stopBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.stop();
      backgroundMusicRef.current = null;
    }
    isPlayingMusicRef.current = false;
  }, []);

  const playTetrisTheme = useCallback(() => {
    if (!audioContextRef.current || !gainNodeRef.current || !isPlayingMusicRef.current) return;

    // Secuencia de notas del tema de Tetris (Korobeiniki)
    const melody = [
      { note: 659, duration: 0.5 }, // E
      { note: 523, duration: 0.25 }, // C
      { note: 587, duration: 0.25 }, // D
      { note: 659, duration: 0.5 }, // E
      { note: 587, duration: 0.25 }, // D
      { note: 523, duration: 0.25 }, // C
      { note: 440, duration: 0.5 }, // A
      { note: 440, duration: 0.25 }, // A
      { note: 523, duration: 0.25 }, // C
      { note: 659, duration: 0.5 }, // E
      { note: 587, duration: 0.25 }, // D
      { note: 523, duration: 0.25 }, // C
      { note: 494, duration: 0.75 }, // B
      { note: 523, duration: 0.25 }, // C
      { note: 587, duration: 0.5 }, // D
      { note: 659, duration: 0.5 }, // E
      { note: 523, duration: 0.5 }, // C
      { note: 440, duration: 0.5 }, // A
      { note: 440, duration: 1 }, // A
    ];

    let time = 0;
    melody.forEach(({ note, duration }, index) => {
      setTimeout(() => {
        if (isPlayingMusicRef.current && audioContextRef.current && gainNodeRef.current) {
          const oscillator = audioContextRef.current.createOscillator();
          oscillator.connect(gainNodeRef.current);
          oscillator.frequency.setValueAtTime(note, audioContextRef.current.currentTime);
          oscillator.type = 'sine';
          oscillator.start();
          oscillator.stop(audioContextRef.current.currentTime + duration);
          
          if (index === melody.length - 1) {
            setTimeout(() => {
              if (isPlayingMusicRef.current) {
                playTetrisTheme(); // Repetir la melodía
              }
            }, duration * 1000);
          }
        }
      }, time * 1000);
      time += duration;
    });
  }, []);

  // Sonidos específicos del juego
  const playMovementSound = useCallback(() => {
    createTone(220, 0.1);
  }, [createTone]);

  const playRotationSound = useCallback(() => {
    createTone(330, 0.15);
  }, [createTone]);

  const playDropSound = useCallback(() => {
    createTone(110, 0.2);
  }, [createTone]);

  const playLineClearSound = useCallback((lines: number) => {
    const frequencies = [440, 554, 659, 880];
    frequencies.slice(0, lines).forEach((freq, index) => {
      setTimeout(() => createTone(freq, 0.3), index * 100);
    });
  }, [createTone]);

  const playGameOverSound = useCallback(() => {
    const notes = [659, 622, 554, 494, 440, 415, 370, 330];
    notes.forEach((freq, index) => {
      setTimeout(() => createTone(freq, 0.5), index * 200);
    });
  }, [createTone]);

  const playLevelUpSound = useCallback(() => {
    const notes = [440, 554, 659, 880];
    notes.forEach((freq, index) => {
      setTimeout(() => createTone(freq, 0.2, 'sine'), index * 100);
    });
  }, [createTone]);

  const toggleMute = useCallback(() => {
    isMutedRef.current = !isMutedRef.current;
    if (isMutedRef.current) {
      stopBackgroundMusic();
    }
    return isMutedRef.current;
  }, [stopBackgroundMusic]);

  const isMuted = useCallback(() => isMutedRef.current, []);

  const isPlayingMusic = useCallback(() => isPlayingMusicRef.current, []);

  return {
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
  };
};
