import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ProximityRadius = 10 | 20;

interface ProximitySettingsContextType {
  radius: ProximityRadius;
  setRadius: (radius: ProximityRadius) => void;
}

const ProximitySettingsContext = createContext<ProximitySettingsContextType | undefined>(undefined);

const STORAGE_KEY = 'quantumoney-proximity-radius';

export function ProximitySettingsProvider({ children }: { children: ReactNode }) {
  const [radius, setRadiusState] = useState<ProximityRadius>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored === '10' || stored === '20') ? parseInt(stored) as ProximityRadius : 10;
  });

  const setRadius = (newRadius: ProximityRadius) => {
    setRadiusState(newRadius);
    localStorage.setItem(STORAGE_KEY, newRadius.toString());
  };

  return (
    <ProximitySettingsContext.Provider value={{ radius, setRadius }}>
      {children}
    </ProximitySettingsContext.Provider>
  );
}

export function useProximitySettings() {
  const context = useContext(ProximitySettingsContext);
  if (!context) {
    throw new Error('useProximitySettings must be used within ProximitySettingsProvider');
  }
  return context;
}
