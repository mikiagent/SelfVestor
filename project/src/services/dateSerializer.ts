export function serializeDate(date: Date | string): string {
  if (date instanceof Date) {
    return date.toISOString();
  }
  return date;
}

export function deserializeDate(date: string | Date): Date {
  if (date instanceof Date) {
    return date;
  }
  return new Date(date);
}