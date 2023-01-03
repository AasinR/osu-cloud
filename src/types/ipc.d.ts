declare global {
    interface Window {
        electron: {
            openExternal: (url: string) => void;
            showDialog: (type: 'openFile' | 'openDirectory') => Promise<string>;
            getDevice: () => Promise<Device>;
            getSaveData: () => Promise<SaveData>;
            checkGameFolder: () => Promise<boolean>;
            getSettings: () => Promise<SettingsData>;
            setSettings: (key: string | SettingsData, value?: unknown) => void;
        };
    }
}

export {};
