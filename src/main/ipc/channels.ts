import { ipcMain, ipcRenderer } from 'electron';
import * as events from './eventHandler';

// ipc channel names
const channel = {
    openExternal: 'open-external-url',
    selectFolder: 'select-folder',
    getDevice: 'device-information',
};

// api call functions
export const api = {
    openExternal: (url: string) =>
        ipcRenderer.invoke(channel.openExternal, url),
    selectFolder: () => ipcRenderer.invoke(channel.selectFolder),
    getDevice: () => ipcRenderer.invoke(channel.getDevice),
};

// load ipc event listeners
export function loadChannels() {
    ipcMain.handle(channel.openExternal, events.openExternal);
    ipcMain.handle(channel.selectFolder, events.selectFolder);
    ipcMain.handle(channel.getDevice, events.getDevice);
}
