import { PlanYear } from '@/types/insurance';
import React, { createContext, ReactNode, useState } from 'react';

type PlanYearContext = {
  planYear: PlanYear | null;
  setPlanYear: React.Dispatch<React.SetStateAction<PlanYear | null>>;
};

export const PlanYearContext = createContext<PlanYearContext>({
  planYear: null,
  setPlanYear: () => {},
});

export const PlanYearProvider = ({ children }: { children: ReactNode }) => {
  const [planYear, setPlanYear] = useState<PlanYear | null>(null);

  return (
    <PlanYearContext.Provider value={{ planYear, setPlanYear }}>
      {children}
    </PlanYearContext.Provider>
  );
};
