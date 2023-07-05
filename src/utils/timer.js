import { Timer, Time, TimerOptions } from "timer-node";
import useCountDown from "react-countdown-hook";

let currentDateTime;
let finishDate;


//Sorting two different libraries into one function, so it is easier to use in project. 

export default function TimerUtils(_settings, countDownTimer, _normalTimer) {


    const normalTimer = _normalTimer;

    const settings = _settings;

 
    const initialTime =  600000;
 


    const interval = 500;
    


    let timer = {
        pomodoro: {
            start: () => {
                currentDateTime = new Date();
                countDownTimer.start()
            },
            pause: () => countDownTimer.pause(),
            resume: () => countDownTimer.resume(),
            stop: () => {
                countDownTimer.reset();
          
                const finishedDate = timer.pomodoro.getFinishedFormatedDate();
                const _currentDateTime = timer.pomodoro.getCurrentFormatedDate();
                console.log(_currentDateTime)
                return {finishedDate, _currentDateTime};
            },
            getFinishedFormatedDate : () => {
                finishDate = new Date();
                
                const options = {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                };
                
                let formattedDate = finishDate.toLocaleString("en-US", options);
            
                return formattedDate;
            },
            getCurrentFormatedDate: () => {
                const options = {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  };
              
                  let formattedDate = currentDateTime.toLocaleString("en-US", options);
              
                  return formattedDate;
            },
          
            changeFormatOfTime: () => {
               
                const remainingTime = countDownTimer.timeLeft;
    
                const milliseconds = remainingTime % 1000;
                const seconds = Math.floor((remainingTime / 1000) % 60);
                const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
                const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
                const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                const formattedTime = {
                    ms: milliseconds,
                    s: seconds,
                    m: minutes,
                    h: hours,
                    d: days,
                };
    
                return formattedTime;
            },
            getTime: () => {
                const time = timer.pomodoro.changeFormatOfTime();
                return time;
            },
            timeFromPomodoro: (defaultTime) => {
                let newTime = timer.pomodoro.changeFormatOfTime();
    
                newTime.m = defaultTime - newTime.m - 1;
                newTime.s = 60 - newTime.s;
                return newTime;
    
            },
            

        },
        normalTimer: {
            start: () => {
                currentDateTime = new Date();
                normalTimer.start()

            },
            pause: () => normalTimer.pause(),
            resume: () => normalTimer.resume(),
            stop: () => {
                normalTimer.stop();
                normalTimer.clear()
              
                
                const finishedDate = timer.pomodoro.getFinishedFormatedDate();
                const _currentDateTime = timer.pomodoro.getCurrentFormatedDate();
                return {finishedDate, _currentDateTime};
            },
            getTime: () => {
                
                return normalTimer.time();
            },
            
        },
        justReturnTest: () => {
            return "test";
        }

    };






    return timer;









}
