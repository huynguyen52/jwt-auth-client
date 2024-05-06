import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/login/index.tsx';
import Users from './pages/users/index.tsx';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

// Create a root loader
const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <App />,
        index: true,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/users',
        element: <Users />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
