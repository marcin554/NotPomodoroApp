import { Timer, Time, TimerOptions } from "timer-node";
import useCountDown from "react-countdown-hook";



//Sorting two different libraries into one function, so it is easier to use in project. 

export default function TimerUtils(_settings, countDownTimer, _normalTimer) {


    const normalTimer = _normalTimer;

    const settings = _settings;

    let currentDateTime;
    let finishDate;

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
                finishDate = new Date();

                return finishDate;
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
            timeFromPomodoro: () => {
                let newTime = timer.pomodoro.changeFormatOfTime();
    
                newTime.m = settings.settings.defaultPomodoroTimerDuration - newTime.m - 1;
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
                finishDate = new Date();
                return finishDate;
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
