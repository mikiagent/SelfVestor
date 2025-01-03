import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TutorialStep {
  id: string;
  route: string;
  element: string;
  message: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface TutorialContextType {
  currentStep: number;
  steps: TutorialStep[];
  isActive: boolean;
  startTutorial: () => void;
  nextStep: () => void;
  previousStep: () => void;
  skipTutorial: () => void;
}

const TutorialContext = createContext<TutorialContextType | null>(null);

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'add-goal',
    route: '/dashboard/goals',
    element: '[data-tutorial="add-goal"]',
    message: "Let's start by creating your first goal! Fill out the form below to add a goal.",
    position: 'bottom'
  },
  {
    id: 'add-transaction',
    route: '/dashboard/budget',
    element: '[data-tutorial="add-transaction"]',
    message: "Now let's set up your monthly budget. Add your income and expenses here to start tracking your progress.",
    position: 'top'
  }
];

export function TutorialProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isActive) {
      navigate(TUTORIAL_STEPS[currentStep].route);
      
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(TUTORIAL_STEPS[currentStep].element);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center'
          });
          element.classList.add('tutorial-highlight');
        }
      }, 500);

      return () => {
        clearTimeout(timeoutId);
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
          el.classList.remove('tutorial-highlight');
        });
      };
    }
  }, [currentStep, isActive, navigate]);

  const startTutorial = () => {
    setCurrentStep(0);
    setIsActive(true);
  };

  const nextStep = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      skipTutorial();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const skipTutorial = () => {
    setIsActive(false);
    localStorage.setItem('tutorial-completed', 'true');
  };

  return (
    <TutorialContext.Provider value={{
      currentStep,
      steps: TUTORIAL_STEPS,
      isActive,
      startTutorial,
      nextStep,
      previousStep,
      skipTutorial
    }}>
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
}