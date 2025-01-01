import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Settings } from '../types/settings';

interface ResetTimerProps {
  category: 'daily' | 'weekly' | 'monthly';
  settings: Settings;
}

export function ResetTimer({ category, settings }: ResetTimerProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let target = new Date();

      switch (category) {
        case 'daily':
          // Reset at midnight
          target.setHours(24, 0, 0, 0);
          break;
        case 'weekly':
          // Reset on the configured day of the week
          const daysUntilReset = (settings.weeklyResetDay - now.getDay() + 7) % 7;
          target.setDate(now.getDate() + daysUntilReset);
          target.setHours(0, 0, 0, 0);
          break;
        case 'monthly':
          // Reset on the configured day of the month
          const currentDay = now.getDate();
          if (currentDay < settings.monthlyResetDay) {
            target.setDate(settings.monthlyResetDay);
          } else {
            target.setMonth(target.getMonth() + 1);
            target.setDate(settings.monthlyResetDay);
          }
          target.setHours(0, 0, 0, 0);
          break;
      }

      const diff = target.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours > 24) {
        const days = Math.floor(hours / 24);
        return `${days}d ${hours % 24}h`;
      }
      return `${hours}h ${minutes}m`;
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every minute
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(interval);
  }, [category, settings]);

  return (
    <div className="flex items-center gap-1 text-sm text-gray-600">
      <Clock className="w-4 h-4" />
      <span>Resets in {timeLeft}</span>
    </div>
  );
}