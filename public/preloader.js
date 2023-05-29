const { contextBridge, ipcRenderer } = require('electron');
window.ipcRenderer = require('electron').ipcRenderer;

console.log('Preloader script loaded');

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








  },
});

// contextBridge.exposeInMainWorld('electronAPI', {
//     setTitle: (title) => ipcRenderer.send('set-title', title)
//   })