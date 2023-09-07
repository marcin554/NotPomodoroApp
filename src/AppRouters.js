import { BrowserRouter,HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Index, { TheTimer } from './pages/Index';
import SessionIndex from './pages/SessionIndex';

import NavigationMenu from './pages/components/NavigationMenu';
import './AppRouters.css';

import ProjectsIndex from './pages/ProjectsIndex';
import SettingsPage from './pages/SettingsPage';
import GoalIndex from './pages/GoalIndex';
import TimerMainMini from './pages/components/TimerMainMini';
import { useDispatch, useSelector } from 'react-redux';
import { createContext, useEffect, useMemo, useRef } from 'react';
import { getSettings } from './utils/utils';
import { setType, updateTime } from './slices/timerSlice';
import { setSettings } from './slices/settingsSlice';
import useCountDown from 'react-countdown-hook';
import TimerUtils from './utils/timer';
import { Timer, Time, TimerOptions } from "timer-node";
import TimerMain from './pages/components/TimerMain';
import NavbarFrame from './pages/components/NavbarFrame';
import MessageComponent from './pages/components/MessageComponent';





function App() {


  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settingsStore.settings);
 
  useEffect(() => {

    if(!settings ){
      console.log('getting settings to State')
      getSettings().then((tempSettings) => {    
        dispatch(setSettings(tempSettings));
        dispatch(setType(tempSettings.defaultTimerType))
       
      })
    }
  
    }, [])


 
  return (
    
    <HashRouter>
      {settings? <AppContent /> : <div>loading...</div>}
    </HashRouter>
  );
}




function AppContent() {
 
 
  const location = useLocation();
  const message = useSelector((state) => state.applicationSlice.message)


  const timer = useRef(TheTimer());

 
  

  const isMiniPath = location.pathname === '/mini';

  return (
    <>
    
    <div className='container'>
   
      {!isMiniPath && (
        <>
           {message && message.length > 2 ?
    
        <div className="messageComponent">
          <MessageComponent className='messageComponent'></MessageComponent>
        </div>
        :null}
         <div className='navbarFrame'>
         <NavbarFrame />
       </div>
        <div className="navigationMenu">
          <NavigationMenu />
        </div>
        
      
        </>
      )}


     
        <Routes>
          <Route path="/" element={<Index timer={timer.current}/>} />
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