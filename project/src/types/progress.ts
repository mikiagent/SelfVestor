export type DailyProgress = {
  date: string; // ISO date string
  progress: number;
};

export type ProgressStatus = 'complete' | 'partial' | 'none';