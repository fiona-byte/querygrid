import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from './contexts/themeContext';
import InternationalizationProvider from './contexts/translatorContext';
import ToastProvider from './contexts/toastContext';
import Router from './router/router';
import 'react-perfect-scrollbar/dist/css/styles.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <InternationalizationProvider>
            <ToastProvider>
              <CssBaseline />
              <Router />
            </ToastProvider>
          </InternationalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
