import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  localDataList: () => ipcRenderer.invoke('local-mapset-list'),
  getAccessToken: () => ipcRenderer.invoke('osu-access-token'),
  deviceData: () => ipcRenderer.invoke('device-data'),
  loadSaveFile: () => ipcRenderer.invoke('load-save-file'),
  writeSaveFile: () => ipcRenderer.invoke('write-save-file'),
});
