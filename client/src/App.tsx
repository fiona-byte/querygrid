import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './router/router';
import './index.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
