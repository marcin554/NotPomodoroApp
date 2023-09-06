const {getTimeInDays, hoursToMinutes} = require("./utils")

function getLastSevenDaysGoals(sessions, goals){
  if(sessions && goals){
    sessions.forEach((element) => {
        let differenceDays = getTimeInDays(element.timeStart);
        
        if (differenceDays < 7 && goals !== null) {
            
          let tempProject = goals.filter(
            (goal) => goal.goal.goalName === element.timerGoalName 
          );
          if (tempProject[0] !== null) {
            
            tempProject[0].goal.timeSpendThisWeek =
                parseInt(tempProject[0].goal.timeSpendThisWeek) + parseInt(element.timeDuration.m);
          }
        }
    
});
  }
}

function getLastSevenDaysProjects(sessions, projects){
  if(sessions && projects){
    sessions.forEach((element) => {
        if (element.timerProjectName !== "none") {
          let differenceDays = getTimeInDays(element.timeStart);
  
          if (differenceDays < 7) {
            let tempProject = projects.filter(
              (project) =>
                project.project.projectName === element.timerProjectName
            );
            if (tempProject[0] !== null) {
              tempProject[0].project.timeSpendThisWeek =
                parseInt(tempProject[0].project.timeSpendThisWeek) + parseInt(element.timeDuration.m);
            }
          }
        }
      });
    }
}

function updateProjectFunction(project, projects){

    console.log(project)
    let find = projects.find(
        (item) => item.project.projectName === project.project.timerProjectName
      );
      if (find) {
        
        find.project.timeSpendTotal =
          parseInt(find.project.timeSpendTotal) +
          hoursToMinutes(project.project.timeDuration.h) +
          parseInt(project.project.timeDuration.m);
      }

      return projects;
    
}

function updateGoalsFunction(goal, goals){
    let find = goals.find(
        (item) => item.goal.goalName === goal.goal.timerGoalName
      );
    
      if (find) {
        find.goal.timeSpendTotal =
          parseInt(find.goal.timeSpendTotal) +
          hoursToMinutes(goal.goal.timeDuration.h) +
          parseInt(goal.goal.timeDuration.m);

        find.goal.timeGoal =
          parseInt(find.goal.timeGoal) -
          hoursToMinutes(goal.goal.timeDuration.h) -
          parseInt(goal.goal.timeDuration.m);

     



          
      }
    
      return goals;
}

module.exports = {
    getLastSevenDaysGoals,
    getLastSevenDaysProjects,
    updateProjectFunction, 
    updateGoalsFunction
}