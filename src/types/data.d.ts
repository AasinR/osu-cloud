declare global {
    interface BeatmapMetadata {
        Title: string;
        Artist: string;
        Creator: string;
    }

    interface LocalBeatmap {
        id: number;
        metadata: BeatmapMetadata;
    }

    interface Beatmap {
        id: number;
        metadata: BeatmapMetadata;
        downloaded: string[];
    }

    interface Device {
        name: string;
        uuid: string;
    }

    interface SaveData {
        devices: Device[];
        beatmaps: Beatmap[];
    }

    interface SettingsData {
        GamePath: string;
        CloudServiceType: string;
        [key: string]: unknown;
    }

    interface CredentialsData {
        project_id: string;
        private_key_id: string;
    }
}

export {};
