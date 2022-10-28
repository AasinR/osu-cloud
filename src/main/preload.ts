import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  localDataList: () => ipcRenderer.invoke('local-mapset-list'),
  getAccessToken: () => ipcRenderer.invoke('osu-access-token'),
  deviceData: () => ipcRenderer.invoke('device-data'),
});
