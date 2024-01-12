import React, { createContext, useState } from 'react';

// Types
import { Employer } from '@/types/employer';

interface ProviderProps {
  children: React.ReactNode;
}

export type EmployerContextData = {
  employer: Employer | undefined;
  saveEmployer: (employer: Employer | undefined) => void;
};

const EmployerContext = createContext<EmployerContextData>({
  employer: undefined,
  saveEmployer: () => undefined,
});

export const EmployerProvider = ({ children }: ProviderProps) => {
  const [employer, setEmployer] = useState<Employer | undefined>(undefined);

  const saveEmployer = (empl: Employer | undefined) => {
    if (empl) {
      const newEployer: Employer = {
        name: empl.name,
        code: empl.code,
        street: empl.street,
        city: empl.city,
        state: empl.state,
        zipCode: empl.zipCode,
        phone: empl.phone,
        logo: empl.logo,
        id: empl.id,
        claimFilling: empl.claimFilling,
        addConsumers: empl.addConsumers,
      };
      setEmployer(newEployer);
    } else {
      setEmployer(undefined);
    }
  };

  return (
    <EmployerContext.Provider value={{ employer, saveEmployer }}>
      {children}
    </EmployerContext.Provider>
  );
};

export default EmployerContext;
