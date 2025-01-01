import React, { useState, useEffect } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarDay } from './CalendarDay';
import { loadProgressHistory } from '../../utils/progressStorage';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatDateString(date: Date): string {
  // Use UTC to ensure consistent date strings regardless of timezone
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [progressHistory, setProgressHistory] = useState(loadProgressHistory());

  const refreshProgress = () => {
    setProgressHistory(loadProgressHistory());
  };

  useEffect(() => {
    const interval = setInterval(refreshProgress, 1000);
    return () => clearInterval(interval);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(Date.UTC(year, month, 1));
    const lastDay = new Date(Date.UTC(year, month + 1, 0));
    const daysInMonth = lastDay.getUTCDate();
    const startingDay = firstDay.getUTCDay();
    
    const days: Date[] = [];
    
    // Add days from previous month
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(Date.UTC(year, month, -i));
      days.push(prevDate);
    }
    
    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(Date.UTC(year, month, i));
      days.push(currentDate);
    }
    
    // Add days from next month
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(Date.UTC(year, month + 1, i));
      days.push(nextDate);
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onRefresh={refreshProgress}
      />
      
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
            {day}
          </div>
        ))}
        
        {days.map((date, index) => {
          const dateString = formatDateString(date);
          const progress = progressHistory[dateString];
          
          return (
            <CalendarDay
              key={index}
              date={date}
              progress={progress}
              isCurrentMonth={date.getMonth() === currentDate.getMonth()}
            />
          );
        })}
      </div>
    </div>
  );
}