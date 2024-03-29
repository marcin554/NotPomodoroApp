const { contextBridge, ipcRenderer } = require('electron');
window.ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('port', e => {
  // port received, make it globally available.
  window.electronMessagePort = e.ports[0]


  window.electronMessagePort.onmessage = messageEvent => {
    // handle message
  }
})

contextBridge.exposeInMainWorld('electronAPI', {
  store: {
    get: async (key) => {
        try {
          const value = await window.ipcRenderer.sendSync('store-get', { key });
          return value;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    set: (key, value) => {
        
      window.ipcRenderer.send('store-set', { key, value });
 
      
    },
    delete: (sessionValues) => {
      window.ipcRenderer.send('delete-session', {sessionValues});
   
    },
    setNewProject: (project) => {
      window.ipcRenderer.send('set-new-project', {project});
    },
    setNewGoal: (goal) => {
      window.ipcRenderer.send('set-new-goal', {goal});
    },
    updateSettings: (settings) => {
      window.ipcRenderer.send('update-settings', {settings});
    },
    updateProject: (project, session) => {
      window.ipcRenderer.send('update-project', {project, session})
    },
    updateGoal: (goal, session) => {
      window.ipcRenderer.send('update-goal', {goal, session})
    },
    updateStatus: (goalOrProject) => {
      window.ipcRenderer.send('update-status', {goalOrProject})
    },
    closeApp: () => {
      window.ipcRenderer.send('app-close')
    },
    openMiniWindow: () => {
      window.ipcRenderer.send('create-mini-window')
    },
    deleteType: (nameAndType) => {
      window.ipcRenderer.send('delete-type', nameAndType)
    },
    getAllSessionGoal: (goal) => {
      window.ipcRenderer.send('all-session-goal', goal)
    },
    getAllSessionProject: (project) => {
      window.ipcRenderer.send('all-session-project', project)
    }

    









  },
});

