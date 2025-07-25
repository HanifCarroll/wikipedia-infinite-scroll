import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.tsx';
import RandomArticles from './pages/RandomArticles.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/random', element: <RandomArticles /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
