import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import routes from './router/router';

import './styles/global.scss';

const rootNode = document.getElementById('root');

if (rootNode) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  const App = () => (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <RouterProvider router={routes} />
      </ConfigProvider>
    </QueryClientProvider>
  );

  createRoot(rootNode).render(<App />);
}
