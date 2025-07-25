import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.tsx';
import RandomArticles from './pages/RandomArticles.tsx';
import SavedArticles from './pages/SavedArticles.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import Clarity from '@microsoft/clarity';

// Microsoft Clarity analytics
const projectId = "skg8giac4r" 
Clarity.init(projectId);

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/random', element: <RandomArticles /> },
  { path: '/saved', element: <SavedArticles /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
