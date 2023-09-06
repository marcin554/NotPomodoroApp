







const sessionsSchema = {
    sessions: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          timeStart: {
            type: "string",
          },
          timeEnd: {
            type: "string",
          },
          timeDuration: {},
          timerType: {
            type: "string",
          },
          timerGoal: {
            type: "string",
          },
          timerProjectName: {
            type: "string",
          },
          timerGoalName: {
            type: "string",
          },
        },
      },
    },
  };
  
const projectsSchema = {
    projects: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          projectName: {
            type: "string",
          },
          timeSpendTotal: {},
          timeSpendThisWeek: {},
        },
      },
    },
  };
  
const goalsSchema = {
    goals: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          goalName: {
            type: "string",
          },
          timeGoal: {},
          timeSpendTotal: {},
          timeSpendThisWeek: {},
        },
      },
    },
  };
  
 const settingsSchema = {
    settings: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          defaultTimerType: {
            type: "string",
            default: "normalTimer",
          },
          defaultPomodoroTimerDuration: {
            type: "number",
            default: 25,
          },
          defaultProject: {
            type: "string",
            workingOn: {
              type: "boolean",
            },
          },
          defaultGoal: {
            type: "string",
            workingOn: {
              type: "boolean",
            },
          },
        },
      },
      default: {},
    },
  };


  // These are used when the settings file is empty. 
const initialSettings = {
    defaultTimerType: "normalTimer",
    defaultPomodoroTimerDuration: 25,
    defaultProject: {
      projectName: "",
      workingOn: false,
    },
    defaultGoal: {
      goalName: "",
      workingOn: false,
    },
  };

  module.exports = {
    sessionsSchema,
    projectsSchema,
    goalsSchema,
    settingsSchema,
    initialSettings,
  };