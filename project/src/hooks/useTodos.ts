import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoCategory, Priority, Batch } from '../types/todo';
import { saveTodos, loadTodos } from '../utils/storage';
import { updateCurrentProgress } from '../utils/progressStorage';
import { calculateProgress } from '../utils/progressCalculator';
import { loadSettings } from '../utils/storage';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const settings = loadSettings();

  // Save todos whenever they change
  const persistTodos = useCallback((updatedTodos: Todo[]) => {
    saveTodos(updatedTodos);
    const progress = calculateProgress(updatedTodos, settings);
    updateCurrentProgress(progress.overall);
  }, [settings]);

  // Check for resets and save on mount and unmount
  useEffect(() => {
    const progress = calculateProgress(todos, settings);
    updateCurrentProgress(progress.overall);

    return () => {
      persistTodos(todos);
    };
  }, [settings, persistTodos, todos]);

  const addTodo = useCallback((
    title: string, 
    category: TodoCategory, 
    total: number,
    batchSize: number,
    priority: Priority
  ) => {
    const batches: Batch[] = [];
    let remaining = total;
    let batchIndex = 0;

    while (remaining > 0) {
      const count = Math.min(remaining, batchSize);
      batches.push({
        id: `${Date.now()}-${batchIndex}`,
        count,
        completed: false
      });
      remaining -= count;
      batchIndex++;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      category,
      priority,
      batches,
      batchSize,
      total,
      remaining: total,
      createdAt: new Date()
    };

    setTodos(prev => [...prev, newTodo]);
  }, []);

  const updateTodo = useCallback((id: string, batchId: string) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === id) {
        const updatedBatches = todo.batches.map(batch => 
          batch.id === batchId ? { ...batch, completed: true } : batch
        );
        const completedCount = updatedBatches
          .filter(b => b.completed)
          .reduce((sum, b) => sum + b.count, 0);
        
        return {
          ...todo,
          batches: updatedBatches,
          remaining: todo.total - completedCount
        };
      }
      return todo;
    }));
  }, []);

  const undoBatch = useCallback((id: string, batchId: string) => {
    setTodos(prev => prev.map(todo => {
      if (todo.id === id) {
        const updatedBatches = todo.batches.map(batch => 
          batch.id === batchId ? { ...batch, completed: false } : batch
        );
        const completedCount = updatedBatches
          .filter(b => b.completed)
          .reduce((sum, b) => sum + b.count, 0);
        
        return {
          ...todo,
          batches: updatedBatches,
          remaining: todo.total - completedCount
        };
      }
      return todo;
    }));
  }, []);

  const editTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const resetDailyGoals = useCallback(() => {
    setTodos(prev => prev.map(todo => {
      if (todo.category === 'daily') {
        return {
          ...todo,
          batches: todo.batches.map(batch => ({ ...batch, completed: false })),
          remaining: todo.total,
          createdAt: new Date()
        };
      }
      return todo;
    }));
  }, []);

  return {
    todos,
    addTodo,
    updateTodo,
    undoBatch,
    deleteTodo,
    editTodo,
    resetDailyGoals
  };
}