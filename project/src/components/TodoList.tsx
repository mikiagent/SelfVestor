import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo, TodoCategory } from '../types/todo';
import { useBudget } from '../hooks/useBudget';
import { useTaskValues } from '../hooks/useTaskValues';

interface TodoListProps {
  todos: Todo[];
  category: TodoCategory;
  onUpdateTodo: (id: string, batchId: string) => void;
  onUndoBatch: (id: string, batchId: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, updates: Partial<Todo>) => void;
}

export function TodoList({ 
  todos, 
  category, 
  onUpdateTodo,
  onUndoBatch,
  onDeleteTodo,
  onEditTodo
}: TodoListProps) {
  const { budgetSummary } = useBudget();
  const taskValues = useTaskValues(todos, budgetSummary.spendingBudget);
  
  const filteredTodos = todos.filter((todo) => todo.category === category);

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          taskValue={taskValues.get(todo.id) || 0}
          onUpdate={onUpdateTodo}
          onUndoBatch={onUndoBatch}
          onDelete={onDeleteTodo}
          onEdit={onEditTodo}
        />
      ))}
    </div>
  );
}