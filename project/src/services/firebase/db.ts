import { doc, setDoc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Todo } from '../../types/todo';
import { Settings } from '../../types/settings';
import { Transaction } from '../../types/budget';

export interface UserData {
  todos: Todo[];
  settings: Settings;
  transactions: Transaction[];
  progressHistory: Record<string, number>;
}

// Create or update user data
export async function setUserData(userId: string, data: Partial<UserData>) {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, data, { merge: true });
}

// Get user data
export async function getUserData(userId: string): Promise<UserData | null> {
  const userRef = doc(db, 'users', userId);
  const docSnap = await getDoc(userRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as UserData;
  }
  return null;
}

// Subscribe to user data changes
export function subscribeToUserData(
  userId: string, 
  onUpdate: (data: UserData) => void
) {
  const userRef = doc(db, 'users', userId);
  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      onUpdate(doc.data() as UserData);
    }
  });
}

// Update specific fields
export async function updateUserData(
  userId: string, 
  data: Partial<UserData>
) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, data);
}