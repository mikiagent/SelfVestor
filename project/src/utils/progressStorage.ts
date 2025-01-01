import { DailyProgress } from '../types/progress';

const PROGRESS_HISTORY_KEY = 'progress-tracker-history';

export function saveDailyProgress(progress: number): void {
  const history = loadProgressHistory();
  const today = new Date().toISOString().split('T')[0];
  
  // Always update today's progress
  const updatedHistory = {
    ...history,
    [today]: progress
  };
  
  // Keep only the last 90 days of history
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 90);
  
  Object.keys(updatedHistory).forEach(date => {
    if (new Date(date) < cutoffDate) {
      delete updatedHistory[date];
    }
  });
  
  localStorage.setItem(PROGRESS_HISTORY_KEY, JSON.stringify(updatedHistory));
}

export function loadProgressHistory(): Record<string, number> {
  const stored = localStorage.getItem(PROGRESS_HISTORY_KEY);
  if (!stored) return {};
  
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading progress history:', error);
    return {};
  }
}

export function updateCurrentProgress(progress: number): void {
  saveDailyProgress(progress);
}

export function getProgressForDate(date: Date): number | undefined {
  const history = loadProgressHistory();
  const dateString = date.toISOString().split('T')[0];
  return history[dateString];
}