import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import SessionIndex from './pages/SessionIndex';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";




function App() {
  return (

   <Routes>
    
    <Route exact path='/' element={<Index />} />
    <Route exact path="/sessions" element={<SessionIndex />} />
    
    </Routes>

   
  );
}

export default App;
