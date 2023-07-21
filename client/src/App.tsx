import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './router/router';
import 'react-perfect-scrollbar/dist/css/styles.css';
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
