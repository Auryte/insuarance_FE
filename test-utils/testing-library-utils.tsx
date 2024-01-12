import React, { FC, ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Contexts
import { ViewsProvider } from '@/contexts/AdminViewsContext';
import { EmployerProvider } from '@/contexts/EmployerContext';
import { SnackbarProvider } from '@/contexts/SnackbarContext';

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => (
  <SnackbarProvider>
    <ViewsProvider>
      <EmployerProvider>{children}</EmployerProvider>
    </ViewsProvider>
  </SnackbarProvider>
);

const renderWithContext = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  render(ui, { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react';
export { renderWithContext as render };
