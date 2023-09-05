import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './AppRouters';
import reportWebVitals from './reportWebVitals';

import Index from './pages/Index';
import { store } from './slices/store.js'
import { Provider } from 'react-redux'
import "./fonts/Poppins-Regular.ttf";
import { BrowserRouter } from 'react-router-dom';
import NavigationMenu from './pages/components/NavigationMenu';
import { getSettings } from './utils/utils';
import { useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';








const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store={store}>
    
  <React.StrictMode>
    


    
    <App />



   
  
  </React.StrictMode>
  </Provider>
);


reportWebVitals();
