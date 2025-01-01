import React, { memo, useState } from 'react';
import { Undo2, Edit2, Trash2, DollarSign, CheckCircle } from 'lucide-react';
import { Todo } from '../types/todo';
import { getPriorityDots, getPriorityLabel } from '../utils/priorityUtils';
import { getStatusColor } from '../utils/statusColors';
import { EditTodoDialog } from './EditTodoDialog';
import { BatchProgress } from './BatchProgress';

interface TodoItemProps {
  todo: Todo;
  taskValue: number;
  onUpdate: (id: string, batchId: string) => void;
  onUndoBatch: (id: string, batchId: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
}

export const TodoItem = memo(function TodoItem({ 
  todo, 
  taskValue,
  onUpdate, 
  onUndoBatch,
  onDelete,
  onEdit
}: TodoItemProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const currentBatchIndex = todo.batches.findIndex(batch => !batch.completed);
  const currentBatch = todo.batches[currentBatchIndex] || todo.batches[todo.batches.length - 1];
  const isComplete = todo.batches.every(batch => batch.completed);

  const handleCompleteBatch = () => {
    if (currentBatch && !isComplete) {
      onUpdate(todo.id, currentBatch.id);
    }
  };

  const handleUndoBatch = () => {
    const lastCompletedBatch = [...todo.batches]
      .reverse()
      .find(batch => batch.completed);
    
    if (lastCompletedBatch) {
      onUndoBatch(todo.id, lastCompletedBatch.id);
    }
  };

  const statusColor = getStatusColor(todo);
  const progress = ((todo.total - todo.remaining) / todo.total) * 100;

  return (
    <>
      <div className={`rounded-lg shadow-md mb-4 overflow-hidden ${statusColor}`}>
        {/* Header */}
        <div className="p-4 bg-white bg-opacity-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-800">{todo.title}</h3>
              <button 
                onClick={() => setShowEditDialog(true)}
                className="text-sm text-red-500 hover:bg-red-50 rounded px-1"
                title={`Priority: ${getPriorityLabel(todo.priority)}\nClick to edit`}
              >
                {getPriorityDots(todo.priority)}
              </button>
              <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-sm">
                <DollarSign className="w-3 h-3" />
                <span>{taskValue}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleUndoBatch}
                disabled={!todo.batches.some(batch => batch.completed)}
                className="p-1 hover:bg-gray-100 rounded text-gray-500 disabled:opacity-50"
                title="Undo last batch"
              >
                <Undo2 size={18} />
              </button>
              <button
                onClick={() => setShowEditDialog(true)}
                className="p-1 hover:bg-gray-100 rounded text-blue-600"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1 hover:bg-gray-100 rounded text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isComplete ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Batch progress */}
          <BatchProgress
            batches={todo.batches}
            batchSize={todo.batchSize}
            currentBatchIndex={currentBatchIndex}
          />
        </div>

        {/* Complete batch button */}
        {!isComplete && (
          <button
            onClick={handleCompleteBatch}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-colors"
          >
            <CheckCircle className="w-5 h-5" />
            Complete Batch {currentBatchIndex + 1}
            <span className="text-sm">
              ({todo.batchSize} of {todo.total})
            </span>
          </button>
        )}
      </div>

      {showEditDialog && (
        <EditTodoDialog
          todo={todo}
          onSave={(updates) => {
            onEdit(todo.id, updates);
            setShowEditDialog(false);
          }}
          onClose={() => setShowEditDialog(false)}
        />
      )}
    </>
  );
});