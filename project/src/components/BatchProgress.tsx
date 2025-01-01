import React from 'react';
import { Batch } from '../types/todo';
import { CheckCircle2, Circle } from 'lucide-react';

interface BatchProgressProps {
  batches: Batch[];
  batchSize: number;
  currentBatchIndex: number;
}

export function BatchProgress({ batches, batchSize, currentBatchIndex }: BatchProgressProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {batches.map((batch, index) => (
        <div
          key={batch.id}
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
            index === currentBatchIndex
              ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
              : batch.completed
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {batch.completed ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <Circle className="w-4 h-4" />
          )}
          <span>
            Batch {index + 1}: {batchSize}
          </span>
        </div>
      ))}
    </div>
  );
}