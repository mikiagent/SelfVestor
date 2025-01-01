import React, { memo, useState } from 'react';
import { Minus, Plus, Trash2, DollarSign } from 'lucide-react';
import { Todo } from '../types/todo';
import { getPriorityDots, getPriorityLabel } from '../utils/priorityUtils';
import { getStatusColor } from '../utils/statusColors';
import { ConfirmDialog } from './ConfirmDialog';

interface TodoItemProps {
  todo: Todo;
  taskValue: number;
  onUpdate: (id: string, remaining: number) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = memo(function TodoItem({ 
  todo, 
  taskValue,
  onUpdate, 
  onDelete 
}: TodoItemProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleComplete = () => {
    if (todo.remaining > 0) {
      onUpdate(todo.id, todo.remaining - 1);
    }
  };

  const handleUncomplete = () => {
    if (todo.remaining < todo.total) {
      onUpdate(todo.id, todo.remaining + 1);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(todo.id);
    setShowDeleteConfirm(false);
  };

  const statusColor = getStatusColor(todo);

  return (
    <>
      <div className={`flex items-center justify-between p-4 rounded-lg shadow mb-2 border ${statusColor} transition-colors duration-200`}>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-800">{todo.title}</h3>
            <span className="text-sm text-red-500" title={`Priority: ${getPriorityLabel(todo.priority)}`}>
              {getPriorityDots(todo.priority)}
            </span>
            <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-sm">
              <DollarSign className="w-3 h-3" />
              <span>{taskValue}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Remaining: {todo.remaining} of {todo.total}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleUncomplete}
            className="p-1 hover:bg-gray-100 rounded"
            disabled={todo.remaining === todo.total}
          >
            <Plus size={18} className="text-gray-600" />
          </button>
          <button
            onClick={handleComplete}
            className="p-1 hover:bg-gray-100 rounded"
            disabled={todo.remaining === 0}
          >
            <Minus size={18} className="text-gray-600" />
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-1 hover:bg-gray-100 rounded text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Goal"
        message={`Are you sure you want to delete "${todo.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
});