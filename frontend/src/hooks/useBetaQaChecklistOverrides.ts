import { useState, useEffect, useCallback } from 'react';

export type ChecklistStatus = 'pass' | 'fail' | 'pending';

export interface ChecklistOverride {
  status: ChecklistStatus;
  notes: string;
}

export interface ChecklistOverrides {
  [itemId: string]: ChecklistOverride;
}

const STORAGE_KEY = 'beta-qa-checklist-overrides';
const STORAGE_VERSION = 1;

interface StorageData {
  version: number;
  overrides: ChecklistOverrides;
}

function loadFromStorage(): ChecklistOverrides {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    
    const data: StorageData = JSON.parse(stored);
    if (data.version !== STORAGE_VERSION) {
      console.warn('Checklist storage version mismatch, clearing data');
      return {};
    }
    
    return data.overrides || {};
  } catch (error) {
    console.error('Failed to load checklist overrides:', error);
    return {};
  }
}

function saveToStorage(overrides: ChecklistOverrides): void {
  try {
    const data: StorageData = {
      version: STORAGE_VERSION,
      overrides,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save checklist overrides:', error);
  }
}

export function useBetaQaChecklistOverrides() {
  const [overrides, setOverrides] = useState<ChecklistOverrides>(() => loadFromStorage());

  useEffect(() => {
    saveToStorage(overrides);
  }, [overrides]);

  const setOverride = useCallback((itemId: string, status: ChecklistStatus, notes: string) => {
    setOverrides(prev => ({
      ...prev,
      [itemId]: { status, notes },
    }));
  }, []);

  const clearOverride = useCallback((itemId: string) => {
    setOverrides(prev => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setOverrides({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    overrides,
    setOverride,
    clearOverride,
    reset,
  };
}
