const path = require("path");
const Store = require("electron-store");

const { app, BrowserWindow, ipcMain, MessageChannelMain } = require("electron");
const { default: useCountDown } = require("react-countdown-hook");

let message = "";

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

const store = new Store({
  name: "data",
  sessionsSchema,
  projectsSchema,
  goalsSchema,
  settingsSchema,
});

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

function handleStoreGet(event, { key }) {

  
 
  const value = store.get(key) || [];
  if (value.length === 0) {
    if (key === "settings") {
      store.set("settings", initialSettings);
    }
  }
  

  let sessions = store.get("sessions") || [];
  if (key === "goals") {
    sessions.forEach((element) => {
      let differenceDays = getTimeInDays(element.timeStart);

      if (differenceDays < 7 && value != null) {
        let tempProject = value.filter(
          (goal) => goal.goal.goalName === element.goalName
        );
        if (tempProject[0] != null) {
          tempProject[0].goal.timeSpendThisWeek =
            tempProject[0].goal.timeSpendThisWeek + element.timeDuration.m;
        }
      }
    });
  } else if (key === "projects") {
    sessions.forEach((element) => {
      if (element.timerProjectName != "none") {
        let differenceDays = getTimeInDays(element.timeStart);

        if (differenceDays < 7) {
          let tempProject = value.filter(
            (project) =>
              project.project.projectName === element.timerProjectName
          );
          if (tempProject[0] != null) {
            tempProject[0].project.timeSpendThisWeek =
              tempProject[0].project.timeSpendThisWeek + element.timeDuration.m;
          }
        }
      }
    });
  }

  event.returnValue = value;
}

function getTimeInDays(date) {
  const oneDay = 24 * 60 * 60 * 1000;

  let currentDate = new Date();
  let dateStarted = new Date(date);

  let differenceDays = Math.round(
    Math.abs((currentDate - dateStarted) / oneDay)
  );
  differenceDays;
  return differenceDays;
}

function setNewProject(event, project) {
  const projects = store.get("projects") || [];

  let find = projects.find(
    (item) => item.project.projectName === project.project.projectName
  );
  if (find) {
    return;
  }

  projects.push(project);

  store.set("projects", projects);
}

function setNewGoal(event, goal) {
  const goals = store.get("goals") || [];

  let find = goals.find((item) => item.goal.goalName === goal.goal.goalName);
  if (find) {
    return;
  }

  goals.push(goal);

  store.set("goals", goals);
}

function updateSettings(event, settings) {

 
  store.set("settings", settings.settings);
}

function handleDeleteSession(event, sessionValues) {
  let session = sessionValues.sessionValues;
  let sessions = store.get("sessions");



  let newSessions = sessions.filter(
    (item) =>
      item.timeDuration.ms != session.timeDuration.ms ||
      item.timeStart != session.timeStart ||
      item.timeEnd != session.timeEnd
  );

  store.set("sessions", newSessions);
}

function handleStoreSet(event, { key, value }) {
  const sessions = store.get("sessions") || [];

  sessions.push(value);

  store.set("sessions", sessions);
}
function handleSetTitle(event, title) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  win.setTitle(title);
}

function hoursToMinutes(hours) {
  return hours * 60;
}
function updateProject(event, project, session) {
  const projects = store.get("projects") || [];
  let find = projects.find(
    (item) => item.project.projectName === project.project.timerProjectName
  );
  if (find) {
    find.project.timeSpendTotal =
      find.project.timeSpendTotal +
      hoursToMinutes(project.project.timeDuration.h) +
      project.project.timeDuration.m;
  }

  store.set("projects", projects);
}

function updateGoal(event, goal, session) {
  const goals = store.get("goals") || [];

  let find = goals.find(
    (item) => item.goal.goalName === goal.goal.timerProjectName
  );

  if (find) {
    find.goal.timeSpendTotal =
      find.goal.timeSpendTotal +
      hoursToMinutes(goal.goal.timeDuration.h) +
      goal.goal.timeDuration.m;
    find.goal.timeGoal =
      find.goal.timeGoal -
      hoursToMinutes(goal.goal.timeDuration.h) -
      goal.goal.timeDuration.m;
  }

  store.set("goals", goals);
}

function updateStatus(event, status) {
  const settings = store.get("settings") || [];

  if (status.goalOrProject === "project") {
    settings.defaultProject.workingOn =
      !settings.defaultProject.workingOn;
  } else if (status.goalOrProject === "goal") {
    settings.defaultGoal.workingOn =
      !settings.defaultGoal.workingOn;
  }

  store.set("settings", settings);
}

// updateProject: (project, session) => {
//   window.ipcRenderer.send('update-project', {project, session})
// },
// updateGoal: (goal, session) => {
//   window.ipcRenderer.send('update-goal', {goal, session})
// }

function setMessage(_message){
  message = _message
}

const { port1, port2 } = new MessageChannelMain()


function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "./preloader.js"),
      backgroundThrottling: false,
    },
  });

  win.once('ready-to-show', () => {
    win.webContents.postMessage('port', null, [port1])
  })

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL("http://localhost:3000");

  // Open the DevTools.

  win.webContents.openDevTools({ mode: "detach" });
}

function createMiniWindow() {
  const miniWin = new BrowserWindow({
    width: 300,
    height: 80,
    title: 'Mini-Timer',
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "./preloader.js"),
    },
  })

  miniWin.once('ready-to-show', () => {
    miniWin.webContents.postMessage('port', null, [port2])

  })

  miniWin.loadURL("http://localhost:3000/mini")
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.on("store-set", handleStoreSet);
  ipcMain.on("store-get", handleStoreGet);
  ipcMain.on("set-title", handleSetTitle);
  ipcMain.on("delete-session", handleDeleteSession);
  ipcMain.on("set-new-project", setNewProject);
  ipcMain.on("set-new-goal", setNewGoal);
  ipcMain.on("update-settings", updateSettings);
  ipcMain.on("update-project", updateProject);
  ipcMain.on("update-goal", updateGoal);
  ipcMain.on("update-status", updateStatus);
  ipcMain.on("app-close", appClose);
  ipcMain.on("create-mini-window", createMiniWindow);
  ipcMain.on("send-message", setMessage)

  createWindow();
  // createMiniWindow();
});

function appClose(){
  app.quit();
}
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});



