import { contextBridge, ipcRenderer } from 'electron';
import { channel } from './ipc/channels';

contextBridge.exposeInMainWorld('electron', {
    openExternal: (url: string) =>
        ipcRenderer.invoke(channel.openExternal, url),
    selectFolder: () => ipcRenderer.invoke(channel.selectFolder),
    getDevice: () => ipcRenderer.invoke(channel.getDevice),
    getSaveData: () => ipcRenderer.invoke(channel.getSaveData),
    checkGameFolder: () => ipcRenderer.invoke(channel.checkGameFolder),
    getSettings: () => ipcRenderer.invoke(channel.getSettings),
    setSettings: (key: string | SettingsData, value?: unknown) =>
        ipcRenderer.invoke(channel.setSettings, key, value),
});
