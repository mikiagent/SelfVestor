import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToUserData, setUserData, UserData } from '../services/firebase/db';
import { DEFAULT_SETTINGS } from '../types/settings';

export function useFirestore() {
  const { user } = useAuth();
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setData(null);
      setLoading(false);
      return;
    }

    let unsubscribed = false;

    const initializeUserData = async () => {
      try {
        await setUserData(user.uid, {
          settings: DEFAULT_SETTINGS,
          todos: [],
          transactions: [],
          progressHistory: {}
        });
      } catch (err) {
        if (!unsubscribed) {
          console.error('Error initializing user data:', err);
          setError(err as Error);
        }
      }
    };

    const unsubscribe = subscribeToUserData(user.uid, (newData) => {
      if (!unsubscribed) {
        if (!newData) {
          initializeUserData();
        } else {
          setData(newData);
          setLoading(false);
        }
      }
    });

    return () => {
      unsubscribed = true;
      unsubscribe();
    };
  }, [user]);

  const updateData = async (updates: Partial<UserData>) => {
    if (!user) return;
    try {
      await setUserData(user.uid, updates);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return { data, loading, error, updateData };
}