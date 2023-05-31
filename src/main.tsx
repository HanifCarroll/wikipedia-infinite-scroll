import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.tsx';
import RandomArticles from './pages/RandomArticles.tsx';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/random', element: <RandomArticles /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
