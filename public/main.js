const path = require('path');
const Store = require('electron-store');

const { app, BrowserWindow, ipcMain } = require('electron');








const schema = {
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
      },
    },
  },
};
const store = new Store({ schema });



function handleStoreGet(event, { key }) {

  const value = store.get('sessions');
  event.returnValue = store.get(value);


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
  ipcMain.on('set-title', handleSetTitle)
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