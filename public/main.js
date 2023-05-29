const path = require('path');
const Store = require('electron-store');

const { app, BrowserWindow, ipcMain } = require('electron');



// projectName: '',
// timeSpendTotal: '',
// timeSpendThisWeek: '',




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
          type: "string"
        }
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
        },
        defaultPomodoroTimerDuration: {
          type: "number",
        },
        defaultProject: {
          type: "string",
        },


      },
    },
  },
};

const store = new Store({ sessionsSchema, projectsSchema, goalsSchema, settingsSchema });




function handleStoreGet(event, { key }) {


  const value = store.get(key);


  event.returnValue = value ;
  console.log(value);

}

function setNewProject (event, project) {
  const projects = store.get('projects') || []; 
  projects.push(project); 

  store.set('projects', projects);
}

function setNewGoal (event, goal) {
  const goals = store.get('goals') || [];
  goals.push(goal);
  
  store.set('goals', goals);

}

function updateSettings (event, settings, whichSetting) {

  store.set('settings', settings);
}





function handleDeleteSession(event, sessionValues) {
  
  let session = sessionValues.sessionValues;
  let sessions = store.get('sessions');

  console.log(sessions);
  
  let newSessions = sessions.filter(item => 
    item.timeDuration.ms != session.timeDuration.ms ||
    item.timeStart != session.timeStart ||
     item.timeEnd != session.timeEnd 
    

  );

  console.log('theSession', session)

  console.log("new Sessions", newSessions)
  store.set('sessions', newSessions);
  
  


}


function handleStoreSet(event, { key, value }) {
  
  const sessions = store.get('sessions') || []; 
  sessions.push(value); 

  store.set('sessions', sessions);
}
function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}



function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
        preload: path.join(__dirname, './preloader.js'), 
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL('http://localhost:3000')

    


  // Open the DevTools.

    win.webContents.openDevTools({ mode: 'detach' });
  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(( ) => {
  ipcMain.on('store-set', handleStoreSet)
  ipcMain.on('store-get', handleStoreGet);
  ipcMain.on('set-title', handleSetTitle);
  ipcMain.on('delete-session', handleDeleteSession);
  ipcMain.on('set-new-project', setNewProject);
  ipcMain.on('set-new-goal', setNewGoal);
  ipcMain.on('update-settings', updateSettings);


createWindow();

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});