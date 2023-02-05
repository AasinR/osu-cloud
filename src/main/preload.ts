import { contextBridge, ipcRenderer } from 'electron';
import { channel } from './ipc/channels';

const electronHandler = {
    controls: {
        close() {
            ipcRenderer.send(channel.closeApp);
        },
        maximize() {
            ipcRenderer.send(channel.maximizeApp);
        },
        minimize() {
            ipcRenderer.send(channel.minimizeApp);
        },
    },

    cloud: {
        getCredentials(filePath?: string): Promise<CredentialsData | null> {
            return ipcRenderer.invoke(channel.getCredentialsData, filePath);
        },
    },

    openExternal(url: string) {
        ipcRenderer.invoke(channel.openExternal, url);
    },
    showDialog(type: 'openFile' | 'openDirectory'): Promise<string> {
        return ipcRenderer.invoke(channel.showDialog, type);
    },
    getDevice(): Promise<Device> {
        return ipcRenderer.invoke(channel.getDevice);
    },
    getSaveData(): Promise<SaveData> {
        return ipcRenderer.invoke(channel.getSaveData);
    },
    checkGameFolder(): Promise<boolean> {
        return ipcRenderer.invoke(channel.checkGameFolder);
    },
    getSettings(): Promise<SettingsData> {
        return ipcRenderer.invoke(channel.getSettings);
    },
    setSettings(key: string | SettingsData, value?: unknown) {
        ipcRenderer.invoke(channel.setSettings, key, value);
    },
    selectGoogleDrive(filePath: string): Promise<boolean> {
        return ipcRenderer.invoke(channel.selectGoogleDrive, filePath);
    },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
