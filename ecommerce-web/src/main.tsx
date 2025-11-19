import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

async function enableMocking() {
  // Enable MSW in development mode
  // Can be disabled by setting VITE_ENABLE_MSW=false in .env
  const shouldEnableMSW = import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW !== 'false';

  if (shouldEnableMSW) {
    const { worker } = await import('./mocks/browser');
    return worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );
});
