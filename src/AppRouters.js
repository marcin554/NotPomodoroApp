

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
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
    <BrowserRouter>
      <div className='container'>
        <div className="navigationMenu" >
          <NavigationMenu />
        </div>
        </>
      )}


     
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
    </BrowserRouter>
  );
}

export default App;