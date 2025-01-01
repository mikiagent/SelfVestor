import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Settings } from '../types/settings';
import { Todo } from '../types/todo';
import { Transaction } from '../types/budget';

export interface UserData {
  settings: Settings;
  todos: Todo[];
  transactions: Transaction[];
}

export async function saveUserData(userId: string, data: Partial<UserData>) {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, data, { merge: true });
}

export async function getUserData(userId: string): Promise<UserData | null> {
  const userRef = doc(db, 'users', userId);
  const docSnap = await getDoc(userRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as UserData;
  }
  
  return null;
}