import { useCallback } from 'react';
import { Settings, DEFAULT_SETTINGS } from '../types/settings';
import { useFirestore } from './useFirestore';

export function useSettings() {
  const { data, updateData } = useFirestore();
  const settings = data?.settings || DEFAULT_SETTINGS;

  const saveSettings = useCallback(async (newSettings: Settings) => {
    await updateData({ settings: newSettings });
  }, [updateData]);

  return {
    settings,
    saveSettings
  };
}