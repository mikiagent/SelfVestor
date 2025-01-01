import React from 'react';
import { TodoList } from './TodoList';
import { Todo, TodoCategory } from '../types/todo';

interface CategorySectionProps {
  title: string;
  category: TodoCategory;
  todos: Todo[];
  onUpdateTodo: (id: string, remaining: number) => void;
  onDeleteTodo: (id: string) => void;
}

export function CategorySection({ title, category, todos, onUpdateTodo, onDeleteTodo }: CategorySectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <TodoList
        todos={todos}
        category={category}
        onUpdateTodo={onUpdateTodo}
        onDeleteTodo={onDeleteTodo}
      />
    </section>
  );
}