import React, { useState } from 'react';
import { AddTodoForm } from '../components/AddTodoForm';
import { DateDisplay } from '../components/DateDisplay';
import { ProgressSection } from '../components/ProgressSection';
import { CategorySection } from '../components/CategorySection';
import { GoalsHeader } from '../components/GoalsHeader';
import { Calendar } from '../components/Calendar/Calendar';
import { useTodos } from '../hooks/useTodos';
import { useBudget } from '../hooks/useBudget';
import { calculateProgress } from '../utils/progressCalculator';
import { loadSettings } from '../utils/storage';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function GoalsPage() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  const { budgetSummary } = useBudget();
  const settings = loadSettings();
  const [showCalendar, setShowCalendar] = useState(true);

  return (
    <div className="space-y-6">
      <DateDisplay />
      
      {/* Goals Progress Header */}
      <GoalsHeader 
        todos={todos}
        monthlyBudget={budgetSummary.spendingBudget}
      />
      
      {/* Goals Section */}
      <div className="space-y-8">
        <CategorySection
          title="Daily Goals"
          category="daily"
          todos={todos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
        />
        <CategorySection
          title="Weekly Goals"
          category="weekly"
          todos={todos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
        />
        <CategorySection
          title="Monthly Goals"
          category="monthly"
          todos={todos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add a Goal</h2>
        <AddTodoForm onAdd={addTodo} />
      </div>

      {/* Progress Section */}
      <ProgressSection progress={calculateProgress(todos, settings)} />

      {/* Calendar Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <h2 className="text-xl font-bold text-gray-900">Progress Calendar</h2>
          {showCalendar ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
        {showCalendar && <Calendar />}
      </div>
    </div>
  );
}