import { useState, useEffect } from 'react';

const TUTORIAL_STORAGE_KEY = 'tutorial-completed';

interface TutorialState {
  showGoalsTutorial: boolean;
  showBudgetTutorial: boolean;
}

export function useTutorial() {
  const [tutorialState, setTutorialState] = useState<TutorialState>(() => {
    const stored = localStorage.getItem(TUTORIAL_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      showGoalsTutorial: true,
      showBudgetTutorial: true
    };
  });

  useEffect(() => {
    localStorage.setItem(TUTORIAL_STORAGE_KEY, JSON.stringify(tutorialState));
  }, [tutorialState]);

  const completeTutorial = (key: keyof TutorialState) => {
    setTutorialState(prev => ({
      ...prev,
      [key]: false
    }));
  };

  const resetTutorials = () => {
    const resetState = {
      showGoalsTutorial: true,
      showBudgetTutorial: true
    };
    setTutorialState(resetState);
    localStorage.setItem(TUTORIAL_STORAGE_KEY, JSON.stringify(resetState));
  };

  return {
    tutorialState,
    completeTutorial,
    resetTutorials
  };
}