import React from 'react';
import { ArrowDown } from 'lucide-react';

interface TutorialTooltipProps {
  message: string;
  position?: 'top' | 'bottom';
  className?: string;
}

export function TutorialTooltip({ message, position = 'top', className = '' }: TutorialTooltipProps) {
  return (
    <div className={`absolute z-50 ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} ${className}`}>
      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg max-w-xs animate-bounce">
        <p className="text-sm">{message}</p>
        <ArrowDown className="w-4 h-4 absolute left-1/2 -translate-x-1/2 text-blue-600" 
          style={{ 
            top: position === 'top' ? '100%' : 'auto',
            bottom: position === 'bottom' ? '100%' : 'auto',
            transform: `translateX(-50%) ${position === 'bottom' ? 'rotate(180deg)' : ''}`
          }} 
        />
      </div>
    </div>
  );
}