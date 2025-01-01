export type TodoCategory = 'daily' | 'weekly' | 'monthly';
export type Priority = 1 | 2 | 3 | 4 | 5;

export interface Todo {
  id: string;
  title: string;
  category: TodoCategory;
  priority: Priority;
  remaining: number;
  total: number;
  createdAt: Date;
}

export interface TodoProgress {
  daily: number;
  weekly: number;
  monthly: number;
  overall: number;
}