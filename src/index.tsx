import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Router } from './Router/router';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { AtelierProvider } from './App/Context/context';
import { Provider } from 'react-redux';
import { store } from './App/Store/configureStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AtelierProvider>
      <Provider store={store}>
      <RouterProvider router={Router} />

      </Provider>
    </AtelierProvider>
  </React.StrictMode> 
);

reportWebVitals();
