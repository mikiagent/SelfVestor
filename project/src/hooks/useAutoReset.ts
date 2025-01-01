import { useEffect } from 'react';
import { Todo } from '../types/todo';
import { Settings } from '../types/settings';

export function useAutoReset(
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  settings: Settings
) {
  useEffect(() => {
    const checkAndResetTodos = () => {
      const now = new Date();
      
      setTodos(currentTodos => 
        currentTodos.map(todo => {
          const todoDate = new Date(todo.createdAt);
          
          // Check if we need to reset based on category and settings
          const shouldReset = (
            (todo.category === 'daily' && todoDate.getDate() !== now.getDate()) ||
            (todo.category === 'weekly' && 
              (now.getDay() === settings.weeklyResetDay && todoDate.getDay() !== settings.weeklyResetDay)) ||
            (todo.category === 'monthly' && 
              (now.getDate() === settings.monthlyResetDay && todoDate.getDate() !== settings.monthlyResetDay))
          );

          if (shouldReset) {
            return {
              ...todo,
              remaining: todo.total,
              createdAt: now
            };
          }
          return todo;
        })
      );
    };

    // Check on mount and when window regains focus
    checkAndResetTodos();
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAndResetTodos();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [setTodos, settings]);
}