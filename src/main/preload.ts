import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  localMapsetIDList: () => ipcRenderer.invoke('local-mapset-list'),
});
