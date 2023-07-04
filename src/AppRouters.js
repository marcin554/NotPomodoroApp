import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Index from './pages/Index';
import SessionIndex from './pages/SessionIndex';

import NavigationMenu from './pages/components/NavigationMenu';
import './AppRouters.css';

import ProjectsIndex from './pages/ProjectsIndex';
import SettingsPage from './pages/SettingsPage';
import GoalIndex from './pages/GoalIndex';
import TimerMainMini from './pages/components/TimerMainMini';
import { useDispatch, useSelector } from 'react-redux';
import { createContext, useEffect } from 'react';
import { getSettings } from './utils/utils';
import { setType, updateTime } from './slices/timerSlice';
import { setSettings } from './slices/settingsSlice';
import useCountDown from 'react-countdown-hook';
import TimerUtils from './utils/timer';
import { Timer, Time, TimerOptions } from "timer-node";
import TimerMain from './pages/components/TimerMain';






function App() {

  return (
    
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}




function AppContent() {
 
 
  const location = useLocation();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settingsStore.settings);


  
  const currentType = useSelector((state) => state.timer.currentType);



  const isMiniPath = location.pathname === '/mini';

  return (
    <>
    <div className='container'>
      {!isMiniPath && (
        <div className="navigationMenu">
          <NavigationMenu />
        </div>
      )}


     
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sessions" element={<SessionIndex  />} />
          <Route path="/projects" element={<ProjectsIndex />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/goals" element={<GoalIndex />} />
          <Route path="/mini" element={<TimerMainMini />} />
        </Routes>

      
    
    </div>
 
    </>
  );
}

export default App;