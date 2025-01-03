import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { GoalsPage } from './GoalsPage';
import { BudgetPage } from '../components/Budget/BudgetPage';
import { useAuth } from '../contexts/AuthContext';
import { TutorialStep } from '../components/Tutorial/TutorialStep';
import { useTutorial } from '../contexts/TutorialContext';
import { TutorialOverlay } from '../components/Tutorial/TutorialOverlay';

export function Dashboard() {
  const { user } = useAuth();
  const { 
    isActive, 
    currentStep, 
    steps, 
    nextStep, 
    previousStep, 
    skipTutorial
  } = useTutorial();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isActive && (
          <TutorialOverlay onClose={skipTutorial}>
            <TutorialStep
              message={steps[currentStep].message}
              position={steps[currentStep].position}
              onNext={nextStep}
              onPrevious={previousStep}
              onSkip={skipTutorial}
              isFirstStep={currentStep === 0}
              isLastStep={currentStep === steps.length - 1}
            />
          </TutorialOverlay>
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/goals" replace />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="budget" element={<BudgetPage />} />
        </Routes>
      </main>
    </div>
  );
}