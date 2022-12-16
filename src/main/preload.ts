import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    openExternal: (url: string) => ipcRenderer.invoke('open-external-url', url),
    localDataList: () => ipcRenderer.invoke('local-mapset-list'),
    getAccessToken: () => ipcRenderer.invoke('osu-access-token'),
    deviceData: () => ipcRenderer.invoke('device-data'),
    loadSaveFile: () => ipcRenderer.invoke('load-save-file'),
    writeSaveFile: (data: SaveFile) =>
        ipcRenderer.invoke('write-save-file', data),
});
