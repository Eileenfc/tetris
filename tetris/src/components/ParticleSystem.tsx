'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleSystemProps {
  trigger: boolean;
  sourceX: number;
  sourceY: number;
  color?: string;
  count?: number;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  trigger,
  sourceX,
  sourceY,
  color = '#ffffff',
  count = 20
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!trigger) return;

    // Crear nuevas partículas
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Math.random(),
        x: sourceX,
        y: sourceY,
        vx: (Math.random() - 0.5) * 200,
        vy: (Math.random() - 0.5) * 200 - 50,
        color,
        life: 60,
        maxLife: 60
      });
    }

    setParticles(newParticles);

    // Animar partículas
    const interval = setInterval(() => {
      setParticles(prevParticles => {
        const updatedParticles = prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx * 0.016,
          y: particle.y + particle.vy * 0.016,
          vy: particle.vy + 200 * 0.016, // Gravedad
          life: particle.life - 1
        })).filter(particle => particle.life > 0);

        if (updatedParticles.length === 0) {
          clearInterval(interval);
        }

        return updatedParticles;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [trigger, sourceX, sourceY, color, count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            opacity: particle.life / particle.maxLife,
            transform: `scale(${particle.life / particle.maxLife})`
          }}
        />
      ))}
    </div>
  );
};
