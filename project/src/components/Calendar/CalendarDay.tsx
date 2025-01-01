import React from 'react';
import { ProgressStatus } from '../../types/progress';
import { Trophy } from 'lucide-react';

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
    complete: 'bg-green-100 border-green-300',
    partial: 'bg-yellow-50 border-yellow-300',
    none: 'bg-white border-gray-200'
  };

  return (
    <div 
      className={`
        relative p-2 border rounded-lg
        ${statusColors[status]}
        ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
        ${isToday ? 'ring-2 ring-blue-500' : ''}
        transition-colors duration-200
      `}
    >
      <div className="flex flex-col items-center">
        <span className="text-sm mb-1">{date.getDate()}</span>
        {status === 'complete' && (
          <Trophy className="w-4 h-4 text-green-600" />
        )}
        {status === 'partial' && progress !== undefined && (
          <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}