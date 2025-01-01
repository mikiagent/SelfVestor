import React from 'react';
import { ProgressBar } from './ProgressBar';
import { TodoProgress } from '../types/todo';
import { Confetti } from './Tutorial/Confetti';
import { getProgressMessage } from '../utils/progressMessages';

interface ProgressSectionProps {
  progress: TodoProgress;
}

export function ProgressSection({ progress }: ProgressSectionProps) {
  const message = getProgressMessage(progress);
  const showConfetti = progress.overall >= 100;

  return (
    <div className="grid gap-4 mb-8">
      <div className="relative">
        <ProgressBar 
          progress={progress.overall} 
          label={message}
        />
        {showConfetti && <Confetti duration={2000} />}
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <ProgressBar progress={progress.daily} label="Daily Goals" />
        <ProgressBar progress={progress.weekly} label="Weekly Goals" />
        <ProgressBar progress={progress.monthly} label="Monthly Goals" />
      </div>
    </div>
  );
}