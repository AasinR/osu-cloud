import { contextBridge, ipcRenderer } from 'electron';
import { channel } from './ipc/channels';

contextBridge.exposeInMainWorld('electron', {
    openExternal: (url: string) =>
        ipcRenderer.invoke(channel.openExternal, url),
    selectFolder: () => ipcRenderer.invoke(channel.selectFolder),
    getDevice: () => ipcRenderer.invoke(channel.getDevice),
    getSaveData: () => ipcRenderer.invoke(channel.getSaveData),
});
