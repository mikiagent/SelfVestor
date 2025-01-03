import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface TutorialStepProps {
  message: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function TutorialStep({
  message,
  position,
  onNext,
  onPrevious,
  onSkip,
  isFirstStep,
  isLastStep
}: TutorialStepProps) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[60]">
      <div className="bg-blue-100 text-blue-900 rounded-lg shadow-lg p-4 max-w-md border border-blue-200">
        <p className="mb-4">{message}</p>
        
        <div className="flex justify-between">
          <div>
            {!isFirstStep && (
              <button
                onClick={onPrevious}
                className="flex items-center gap-1 bg-blue-200 hover:bg-blue-300 text-blue-800 px-3 py-1.5 rounded-md transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
            )}
          </div>
          
          <div className="flex gap-4">
            {!isLastStep && (
              <button
                onClick={onSkip}
                className="px-3 py-1.5 rounded-md bg-blue-200 hover:bg-blue-300 text-blue-800 transition-colors"
              >
                Skip Tutorial
              </button>
            )}
            
            <button
              onClick={isLastStep ? onSkip : onNext}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
                isLastStep 
                  ? 'bg-green-200 hover:bg-green-300 text-green-800' 
                  : 'bg-blue-200 hover:bg-blue-300 text-blue-800'
              }`}
            >
              {isLastStep ? 'Finish' : 'Next'}
              {!isLastStep && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}