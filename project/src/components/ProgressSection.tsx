import React from 'react';
import { ProgressBar } from './ProgressBar';
import { TodoProgress } from '../types/todo';

interface ProgressSectionProps {
  progress: TodoProgress;
}

export function ProgressSection({ progress }: ProgressSectionProps) {
  return (
    <div className="grid gap-4 mb-8">
      <ProgressBar progress={progress.overall} label="Overall Progress" />
      <div className="grid grid-cols-3 gap-4">
        <ProgressBar progress={progress.daily} label="Daily Goals" />
        <ProgressBar progress={progress.weekly} label="Weekly Goals" />
        <ProgressBar progress={progress.monthly} label="Monthly Goals" />
      </div>
    </div>
  );
}