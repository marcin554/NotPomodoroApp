# NotPomodoroApp
#### Countdown and timer pomodoro like app. 

### Project Description:
   I have developed a Timer/Pomodoro application to meet my personal needs.
 

### Technologies used: 
   * Electron
   * React
   * Javascript
   * Redux
   * MaterialUI
   * Tailwind


   ### Good
   - 
      This project has been a valuable learning experience, especially as it marks my first venture into using Electron. Throughout the development, I gained a deeper understanding of main and render processes, as well as 
      the importance of managing the queue efficiently. I dedicated additional time to design and responsiveness, incorporating new UI libraries for the first time.
     
     

   ### Critique
 
   -
     While the application is currently functional, I recognize the need for bug fixing, code cleanup, optimization, and more detailed comments. Looking back, there are a few aspects I would approach differently in a          future iteration. Specifically:
     
   Libraries Handling Countdown/Timer:
   Instead of relying on two different libraries with varying timer-handling methods, I would consider creating my own libraries to streamline the code and enhance consistency.

   Data Storage:
   I would opt for localStorage or LiteSQL to handle data storage. This choice would facilitate web hosting without introducing unnecessary complexity.

   Date/Time Objects:
   In place of storing time information as simple integers, I would leverage JavaScript's Date/Time objects for a more robust and standardized approach.
      

![](https://github.com/marcin554/NotPomodoroApp/blob/dev/Timer.gif)
![](https://github.com/marcin554/NotPomodoroApp/blob/dev/Options.gif)
![](https://github.com/marcin554/NotPomodoroApp/blob/dev/Overlay.png)
