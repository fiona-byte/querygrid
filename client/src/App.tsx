import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from './contexts/themeContext';
import InternationalizationProvider from './contexts/translatorContext';
import Router from './router/router';
import { RequestError } from './services';
import { utils } from './utils';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const err = error as RequestError;
      if (err.response?.data?.message === 'invalid token') {
        utils.clearAuthentication();
        return window.location.replace('/login');
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const err = error as RequestError;
      if (err.response?.data?.message === 'invalid token') {
        utils.clearAuthentication();
        return window.location.replace('/login');
      }
    },
  }),
});

const App = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <InternationalizationProvider>
            <CssBaseline />
            <HelmetProvider>
              <Router />
            </HelmetProvider>
          </InternationalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
