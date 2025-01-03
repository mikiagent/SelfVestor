export function validateBatchInput(total: number, batchSize: number): string | null {
  if (isNaN(total) || total <= 0) {
    return 'Total count must be a positive number';
  }

  if (isNaN(batchSize) || batchSize <= 0) {
    return 'Batch size must be a positive number';
  }

  if (batchSize > total) {
    return 'Batch size cannot be larger than total count';
  }

  return null;
}