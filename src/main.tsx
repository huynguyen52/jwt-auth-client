import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import Login from './pages/login/index.tsx';
import Register from './pages/register/index.tsx';
import Users from './pages/users/index.tsx';
import { store } from './store.ts';
import { CssBaseline } from '@mui/material';
import HandsOn from './pages/hands-on/index.tsx';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
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
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/hands-on',
        element: <HandsOn />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
