

import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import SessionIndex from './pages/SessionIndex';

import NavigationMenu from './pages/components/NavigationMenu';
import  './AppRouters.css'

import ProjectsIndex from './pages/ProjectsIndex';
import SettingsPage from './pages/SettingsPage';
import GoalIndex from './pages/GoalIndex';






//q: why the styles.container isnt respected in css?



function App() {
  return (
    <HashRouter>
      <div className='container'>
        <div className="navigationMenu" >
          <NavigationMenu />
     
        </div>
     
        <div className="routerContent">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sessions" element={<SessionIndex />} />
            <Route path="/projects" element={<ProjectsIndex />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/goals" element={<GoalIndex />}></Route>

          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
