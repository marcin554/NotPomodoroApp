import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Index from './pages/Index';
import { store } from './slices/store.js'
import { Provider } from 'react-redux'
import "./fonts/Poppins-Regular.ttf";
import { BrowserRouter } from 'react-router-dom';
import NavigationMenu from './pages/components/NavigationMenu';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>

    <BrowserRouter>
    <NavigationMenu />
    <App />

    </BrowserRouter>
  
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
