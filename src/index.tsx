import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Router } from './Router/router';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { AtelierProvider } from './App/Context/context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AtelierProvider>
    <RouterProvider router={Router} />
    </AtelierProvider>
  </React.StrictMode> 
);

reportWebVitals();
