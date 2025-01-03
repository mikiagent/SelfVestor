import { Transaction } from '../types/budget';

export function serializeTransaction(transaction: Transaction): any {
  return {
    ...transaction,
    date: transaction.date instanceof Date ? transaction.date.toISOString() : transaction.date
  };
}

export function deserializeTransaction(data: any): Transaction {
  return {
    ...data,
    date: new Date(data.date)
  };
}

export function serializeTransactions(transactions: Transaction[]): any[] {
  return transactions.map(serializeTransaction);
}

export function deserializeTransactions(data: any[]): Transaction[] {
  return data.map(deserializeTransaction);
}