
let currentDateTime;
let finishDate;


//Sorting two different libraries into one function, so it is easier to use in project. 

export default function TimerUtils(_settings, countDownTimer, _normalTimer) {


    const normalTimer = _normalTimer;


    let timer = {
        pomodoro: {
            start: () => {
                currentDateTime = new Date();
                countDownTimer.start()
            },
            pause: () => countDownTimer.pause(),
            resume: () => countDownTimer.resume(),
            stop: (dateStart) => {
                countDownTimer.reset();
          
                const finishedDate = timer.pomodoro.getFinishedFormatedDate();
                const _currentDateTime = timer.pomodoro.getStartDate(dateStart);
                
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
            getCurrentFormatedDate2: (date2) => {

                const date = new Date(date2);
                const options = {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  };
              
                  let formattedDate = date.toLocaleString("en-US", options);
           
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
            timeFromPomodoro: (defaultTime, timeFromState) => {
                
                let newTime = {...timeFromState._timeState};
                let _defaultTime = defaultTime;
                
        

            
             
                newTime.m = _defaultTime - newTime.m - 1;
                if(newTime.s != null )
                {
                    newTime.s = 60 - newTime.s
                }
                return newTime;
    
            },
            getStartDate: (dateOfStart) => {
                let date = timer.pomodoro.getCurrentFormatedDate2(dateOfStart);
                return date;
            }
            

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
