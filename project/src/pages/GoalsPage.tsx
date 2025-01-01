import React from 'react';
import { AddTodoForm } from '../components/AddTodoForm';
import { DateDisplay } from '../components/DateDisplay';
import { ProgressSection } from '../components/ProgressSection';
import { CategorySection } from '../components/CategorySection';
import { GoalsHeader } from '../components/GoalsHeader';
import { Calendar } from '../components/Calendar/Calendar';
import { useTodos } from '../hooks/useTodos';
import { useBudget } from '../hooks/useBudget';
import { useSettings } from '../hooks/useSettings';
import { calculateProgress } from '../utils/progressCalculator';

export function GoalsPage() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  const { budgetSummary } = useBudget();
  const { settings } = useSettings();

  return (
    <div className="space-y-6">
      <DateDisplay />
      
      <GoalsHeader 
        todos={todos}
        monthlyBudget={budgetSummary.spendingBudget}
      />

      <div className="space-y-8">
        <CategorySection
          title="Goals"
          category="daily"
          todos={todos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6 relative pointer-events-auto" data-tutorial="add-goal">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add a Goal</h2>
        <AddTodoForm onAdd={addTodo} />
      </div>

      <ProgressSection progress={calculateProgress(todos, settings)} />

      <Calendar />
    </div>
  );
}