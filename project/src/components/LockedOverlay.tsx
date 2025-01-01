import React from 'react';
import { Lock } from 'lucide-react';

interface LockedOverlayProps {
  message: string;
}

export function LockedOverlay({ message }: LockedOverlayProps) {
  return (
    <div className="absolute inset-0 backdrop-blur-sm bg-white/50 rounded-lg flex items-center justify-center z-10">
      <div className="text-center p-4">
        <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}