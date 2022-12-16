declare global {
    interface Window {
        electron: {
            openExternal: (url: string) => void;
            localDataList: () => Promise<LocalBeatmap[]>;
            getAccessToken: () => Promise<{
                accessToken: string;
                expirationDate: Date;
            }>;
            deviceData: () => Promise<Device>;
            loadSaveFile: () => Promise<SaveFile>;
            writeSaveFile: (data: SaveFile) => void;
        };
    }

    interface BeatMap {
        id: number;
        metadata: { [key: string]: string };
        downloaded: string[];
    }

    interface LocalBeatmap {
        id: number;
        metadata: { [key: string]: string };
    }

    interface Device {
        name: string;
        uuid: string;
    }

    interface SaveFile {
        devices: Device[];
        beatmaps: BeatMap[];
    }
}

export {};
