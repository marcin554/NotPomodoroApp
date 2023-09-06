const {
  sessionsSchema,
  projectsSchema,
  goalsSchema,
  settingsSchema,
  initialSettings,
} = require("./extra/storageSchemas");
const path = require("path");
const Store = require("electron-store");
const { app, BrowserWindow, ipcMain} = require("electron");


const {
  getLastSevenDaysGoals,
  getLastSevenDaysProjects,
  updateProjectFunction,
  updateGoalsFunction,
} = require("./extra/electronStoreFunctions");

const store = new Store({
  name: "data",
  sessionsSchema,
  projectsSchema,
  goalsSchema,
  settingsSchema,
});

function handleStoreGet(event, { key }) {
  const value = store.get(key) || [];
  if (value.length === 0) {
    if (key === "settings") {
      store.set("settings", initialSettings);
    }
  }

  let sessions = store.get("sessions") || [];

  if (key === "goals") {
    getLastSevenDaysGoals(sessions, value);
  } else if (key === "projects") {
    getLastSevenDaysProjects(sessions, value);
  }

  event.returnValue = value;
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
      item.timeDuration.ms !== session.timeDuration.ms ||
      item.timeStart !== session.timeStart ||
      item.timeEnd !== session.timeEnd
  );

  store.set("sessions", newSessions);
}

function deleteType(event, nameNdType) {
  let storeArray = store.get(nameNdType.type);

  switch (nameNdType.type) {
    case "goals": {
      let newArray = storeArray.filter(
        (item) => item.goal.goalName !== nameNdType.name
      );
      store.set(nameNdType.type, newArray);
      break;
    }
    case "projects": {
      let newArray = storeArray.filter(
        (item) => item.project.projectName !== nameNdType.name
      );

      store.set(nameNdType.type, newArray);
      break;
    }

    default: {
      break;
    }
  }
}

function handleStoreSet(event, { key, value }) {
  const sessions = store.get("sessions") || [];

  sessions.push(value);

  store.set("sessions", sessions);
}

function updateProject(event, project, session) {
  const projects = store.get("projects") || [];
  const result = updateProjectFunction(project, projects);

  store.set("projects", result);
}

function updateGoal(event, goal) {
  const goals = store.get("goals") || [];
  const result = updateGoalsFunction(goal, goals);

  store.set("goals", result);
}

function updateStatus(event, status) {
  const settings = store.get("settings") || [];

  if (status.goalOrProject === "project") {
    settings.defaultProject.workingOn = !settings.defaultProject.workingOn;
  } else if (status.goalOrProject === "goal") {
    settings.defaultGoal.workingOn = !settings.defaultGoal.workingOn;
  }

  store.set("settings", settings);
}

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    minWidth: 600,
    height: 700,
    minHeight: 600,
    frame: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "./preloader.js"),
      backgroundThrottling: false,
    },
  });

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
    title: "Mini-Timer",
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "./preloader.js"),
    },
  });

  miniWin.loadURL("http://localhost:3000/mini");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.on("store-set", handleStoreSet);
  ipcMain.on("store-get", handleStoreGet);
  ipcMain.on("delete-session", handleDeleteSession);
  ipcMain.on("set-new-project", setNewProject);
  ipcMain.on("set-new-goal", setNewGoal);
  ipcMain.on("update-settings", updateSettings);
  ipcMain.on("update-project", updateProject);
  ipcMain.on("update-goal", updateGoal);
  ipcMain.on("update-status", updateStatus);
  ipcMain.on("app-close", appClose);
  ipcMain.on("create-mini-window", createMiniWindow);
  ipcMain.on("delete-type", deleteType);

  createWindow();
  // createMiniWindow();
});

function appClose() {
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
