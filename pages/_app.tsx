import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

// Contexts
import { AuthProvider } from '@/contexts/AuthContext';
import { SnackbarProvider } from '@/contexts/SnackbarContext';
import { EmployerProvider } from '@/contexts/EmployerContext';

// Styles
import { theme } from '@/styles/theme';
import '@/styles/globals.css';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('@/mocks');
}

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || (page => page);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <EmployerProvider>
          <SnackbarProvider>{getLayout(<Component {...pageProps} />)}</SnackbarProvider>
        </EmployerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
export default App;
