import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  duration?: number;
  onComplete?: () => void;
}

export function Confetti({ duration = 3000, onComplete }: ConfettiProps) {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3B82F6', '#10B981', '#6366F1']
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3B82F6', '#10B981', '#6366F1']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        setIsActive(false);
        onComplete?.();
      }
    };

    frame();

    return () => {
      setIsActive(false);
    };
  }, [duration, onComplete]);

  return null;
}