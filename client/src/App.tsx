import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from './contexts/themeContext';
import InternationalizationProvider from './contexts/translatorContext';
import Router from './router/router';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import ToastProvider from './contexts/toastContext';

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
