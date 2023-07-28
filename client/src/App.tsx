import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from './contexts/themeContext';
import InternationalizationProvider from './contexts/translatorContext';
import Router from './router/router';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <InternationalizationProvider>
          <CssBaseline />
          <Router />
        </InternationalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
