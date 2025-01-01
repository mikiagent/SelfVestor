import React from 'react';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onRefresh: () => void;
}

export function CalendarHeader({ currentDate, onPrevMonth, onNextMonth, onRefresh }: CalendarHeaderProps) {
  const monthYear = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">{monthYear}</h2>
        <button
          onClick={onNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <button
        onClick={onRefresh}
        className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
        aria-label="Refresh calendar"
      >
        <RefreshCw className="w-5 h-5" />
      </button>
    </div>
  );
}