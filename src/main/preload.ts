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
        saveService(serviceType: string, data?: string): Promise<boolean> {
            return ipcRenderer.invoke(
                channel.saveCloudService,
                serviceType,
                data
            );
        },
        getCredentials(filePath?: string): Promise<CredentialsData | null> {
            return ipcRenderer.invoke(channel.getCredentialsData, filePath);
        },
    },

    settings: {
        get(): Promise<SettingsData> {
            return ipcRenderer.invoke(channel.getSettings);
        },
        set(key: string | SettingsData, value?: unknown) {
            ipcRenderer.send(channel.setSettings, key, value);
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
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
