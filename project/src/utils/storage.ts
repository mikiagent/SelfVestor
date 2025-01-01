import { Todo } from '../types/todo';
import { Settings, DEFAULT_SETTINGS } from '../types/settings';
import { migrateData } from './migrations';

const TODOS_KEY = 'progress-tracker-todos';
const SETTINGS_KEY = 'progress-tracker-settings';

export function saveTodos(todos: Todo[]): void {
  const todosWithDates = todos.map(todo => ({
    ...todo,
    createdAt: todo.createdAt.toISOString()
  }));
  localStorage.setItem(TODOS_KEY, JSON.stringify(todosWithDates));
}

export function loadTodos(): Todo[] {
  const stored = localStorage.getItem(TODOS_KEY);
  if (!stored) return [];
  
  try {
    const parsed = JSON.parse(stored);
    // Migrate existing data to include batches
    const migrated = migrateData(parsed);
    return migrated.map(todo => ({
      ...todo,
      createdAt: new Date(todo.createdAt)
    }));
  } catch (error) {
    console.error('Error loading todos:', error);
    return [];
  }
}

export function saveSettings(settings: Settings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadSettings(): Settings {
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) return DEFAULT_SETTINGS;
  
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading settings:', error);
    return DEFAULT_SETTINGS;
  }
}