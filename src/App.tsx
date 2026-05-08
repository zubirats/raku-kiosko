import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { useOperatingHours } from '@/hooks/use-operating-hours';
import Welcome from '@/pages/Welcome';
import Closed from '@/pages/Closed';
import Menu from '@/pages/Menu';
import Payment from '@/pages/Payment';
import WhatsAppInput from '@/pages/WhatsAppInput';
import Confirmation from '@/pages/Confirmation';
import NotFound from '@/pages/NotFound';
import '@/lib/i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: 1,
    },
  },
});

function AppRouter() {
  const { isOpen } = useOperatingHours();

  // If closed, redirect all routes to /closed
  if (!isOpen) {
    return (
      <Routes>
        <Route path="/closed" element={<Closed />} />
        <Route path="*" element={<Navigate to="/closed" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/whatsapp" element={<WhatsAppInput />} />
      <Route path="/confirmation/:orderNumber" element={<Confirmation />} />
      <Route path="/closed" element={<Closed />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  useEffect(() => {
    // Add viewport meta tag for iOS safe areas
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
