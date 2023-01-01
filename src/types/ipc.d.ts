declare global {
    interface Window {
        electron: {
            openExternal: (url: string) => void;
            selectFolder: () => Promise<string>;
            getDevice: () => Promise<Device>;
            getSaveData: () => Promise<SaveData>;
            checkGameFolder: () => Promise<boolean>;
            getSettings: () => Promise<SettingsData>;
            setSettings: (key: string | SettingsData, value?: unknown) => void;
        };
    }
}

export {};
