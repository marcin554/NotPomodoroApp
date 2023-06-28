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
import { useEffect } from 'react';
import { getSettings } from './utils/utils';
import { setType, updateTime } from './slices/timerSlice';
import { setSettings } from './slices/settingsSlice';
import useCountDown from 'react-countdown-hook';
import TimerUtils from './utils/timer';
import { Timer, Time, TimerOptions } from "timer-node";

const normalTimer = new Timer({ label: "normalTimer" });


function TheTimer() {
  const dispatch = useDispatch();
  
  const [timeLeft, { start, pause, resume, reset, }] = useCountDown(
    600000, 
    500
  );
  //Get Settings from state.
  let settings = useSelector((state) => state.settingsStore.settings);
  
  
   const timer = TimerUtils(settings, { timeLeft, start, pause, resume, reset }, normalTimer );
  
  
   useEffect(() => {
    dispatch(updateTime(timer.pomodoro.getTime()));
  }, [timeLeft]);

  return timer;
  
}

function App() {
  console.log('rendering App')
  const timer = TheTimer();
  return (
    
    <BrowserRouter>
      <AppContent timer={timer} />
    </BrowserRouter>
  );
}



function AppContent({timer}) {
 


  const location = useLocation();


  const isMiniPath = location.pathname === '/mini';

  return (
    <>
    <div className='container'>
      {!isMiniPath && (
        <div className="navigationMenu">
          <NavigationMenu />
        </div>
      )}

 {timer ?
 
      
        <Routes>
          <Route path="/" element={<Index _timer={timer} />} />
          <Route path="/sessions" element={<SessionIndex  />} />
          <Route path="/projects" element={<ProjectsIndex />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/goals" element={<GoalIndex />} />
          <Route path="/mini" element={<TimerMainMini _timer={timer} />} />
        </Routes>
        
      
       : <div>Waiting...</div>} 
    </div>
 
    </>
  );
}

export default App;