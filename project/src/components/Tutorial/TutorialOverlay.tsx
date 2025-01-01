import React from 'react';
import { X } from 'lucide-react';

interface TutorialOverlayProps {
  children: React.ReactNode;
  onClose: () => void;
}

export function TutorialOverlay({ children, onClose }: TutorialOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Dimmed background with pointer events enabled */}
      <div className="absolute inset-0 bg-black/10 pointer-events-auto" />
      
      {/* Tutorial content */}
      <div className="relative pointer-events-auto">
        {children}
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 p-2 bg-blue-100 text-blue-800 rounded-full shadow-lg hover:bg-blue-200 pointer-events-auto transition-colors"
          aria-label="Close tutorial"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}