import React, { createContext, useState } from 'react';
import { MainViews } from '@/types/adminTypes';

export type ViewsContextData = {
  viewName: string | number;
  setViewName: (viewName: string | number) => void;
};

const ViewsContext = createContext<ViewsContextData>({
  viewName: MainViews.employerSearch,
  setViewName: () => null,
});

interface ProviderProps {
  children: React.ReactNode;
}

export const ViewsProvider = ({ children }: ProviderProps) => {
  const [viewName, setViewName] = useState<string | number>(MainViews.employerSearch);
  return (
    <ViewsContext.Provider value={{ viewName, setViewName }}>{children}</ViewsContext.Provider>
  );
};

export default ViewsContext;
