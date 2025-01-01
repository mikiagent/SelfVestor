import { Priority } from './priority';

export type TodoCategory = 'daily' | 'weekly' | 'monthly';

export interface Batch {
  id: string;
  count: number;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  category: TodoCategory;
  priority: Priority;
  batches: Batch[];
  batchSize: number;
  total: number;
  remaining: number;
  createdAt: Date;
}

export interface TodoProgress {
  daily: number;
  weekly: number;
  monthly: number;
  overall: number;
}