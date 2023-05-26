

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import SessionIndex from './pages/SessionIndex';

import NavigationMenu from './pages/components/NavigationMenu';
import  './AppRouters.css'







//q: why the styles.container isnt respected in css?



function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <div className="navigationMenu" >
          <NavigationMenu />
     
        </div>
     
        <div className="routerContent">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sessions" element={<SessionIndex />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
