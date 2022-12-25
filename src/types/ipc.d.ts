declare global {
    interface Window {
        electron: {
            openExternal: (url: string) => void;
            selectFolder: () => Promise<string>;
            getDevice: () => Promise<Device>;
            getSaveData: () => Promise<SaveData>;
        };
    }
}

export {};
