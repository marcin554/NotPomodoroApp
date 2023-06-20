import React from 'react'
import _Container from './components/Container'
import GoalComponent from './components/GoalComponent'
import { getGoals, getSettings } from '../utils/utils'
import { useEffect, useState } from 'react'


const GoalIndex = () => {

    const [settings, setSettings] = useState();
    

    useEffect(() => {
        getSettings().then((tempSettings) => {
        
          
           
            setSettings(tempSettings);
         
         
        })
    }, [])

    const [goals, setGoals] = useState();

    useEffect(() => {
        getGoals().then((tempGoals) => 
        {
          if(tempGoals != null){
            tempGoals.forEach(element => {
          
              element.checked = false;
            });
          }
           
            
            setGoals(tempGoals);
        })
    }, [])
        



  return (
    <div>
         {settings && goals ? 
   
   
        <_Container ComponentPage={<GoalComponent  goals={goals} settings={settings}/> } />
        
        : null
    } 
    </div>
  )
}

export default GoalIndex
