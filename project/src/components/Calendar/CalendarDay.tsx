import React from 'react';
import { ProgressStatus } from '../../types/progress';

interface CalendarDayProps {
  date: Date;
  progress?: number;
  isCurrentMonth: boolean;
}

export function CalendarDay({ date, progress, isCurrentMonth }: CalendarDayProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);
  const isToday = currentDate.getTime() === today.getTime();

  const getProgressStatus = (progress?: number): ProgressStatus => {
    if (progress === undefined) return 'none';
    if (progress >= 100) return 'complete';
    if (progress > 0) return 'partial';
    return 'none';
  };

  const status = getProgressStatus(progress);
  const statusColors = {
    complete: 'bg-green-500',
    partial: 'bg-yellow-500',
    none: 'bg-gray-300'
  };

  return (
    <div 
      className={`
        relative p-2 
        ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
        ${isToday ? 'ring-2 ring-blue-500 rounded-lg' : ''}
      `}
    >
      <div className="flex flex-col items-center">
        <span className="text-sm mb-1">{date.getDate()}</span>
        <div 
          className={`w-2 h-2 rounded-full ${statusColors[status]}`} 
          title={`Progress: ${progress?.toFixed(0)}%`}
        />
      </div>
    </div>
  );
}