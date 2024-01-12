import React, { createContext, useState } from 'react';

export type LogoUrlContextData = {
  imageUrl: string | undefined;
  setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const LogoUrlContext = createContext<LogoUrlContextData>({
  imageUrl: undefined,
  setImageUrl: () => {},
});

interface ProviderProps {
  children: React.ReactNode;
}

export const LogoUrlProvider = ({ children }: ProviderProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  return (
    <LogoUrlContext.Provider value={{ imageUrl, setImageUrl }}>{children}</LogoUrlContext.Provider>
  );
};

export default LogoUrlContext;
