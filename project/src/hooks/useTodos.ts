import { useState, useEffect } from 'react';
import { Todo, TodoCategory, Priority } from '../types/todo';
import { saveTodos, loadTodos } from '../utils/storage';
import { updateCurrentProgress } from '../utils/progressStorage';
import { calculateProgress } from '../utils/progressCalculator';
import { loadSettings } from '../utils/storage';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const settings = loadSettings();

  useEffect(() => {
    saveTodos(todos);
    // Calculate and save progress whenever todos change
    const progress = calculateProgress(todos, settings);
    updateCurrentProgress(progress.overall);
  }, [todos, settings]);

  const addTodo = (title: string, category: TodoCategory, total: number, priority: Priority) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      category,
      priority,
      total,
      remaining: total,
      createdAt: new Date(),
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const updateTodo = (id: string, remaining: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, remaining } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    setTodos
  };
}