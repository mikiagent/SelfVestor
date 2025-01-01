import React from 'react';
import { Trophy } from 'lucide-react';

interface TutorialSuccessProps {
  onClose: () => void;
}

export function TutorialSuccess({ onClose }: TutorialSuccessProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md text-center shadow-xl animate-bounce">
        <div className="mb-4 inline-block p-4 bg-yellow-100 rounded-full">
          <Trophy className="w-12 h-12 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Congratulations! 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          You've completed the tutorial and set up your first goal and budget. 
          You're now ready to start tracking your progress!
        </p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Let's Get Started!
        </button>
      </div>
    </div>
  );
}