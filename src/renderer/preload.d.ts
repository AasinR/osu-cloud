declare global {
  interface Window {
    electron: {
      localDataList: () => Promise<
        { id: number; metaData: { [key: string]: string } }[]
      >;
      getAccessToken: () => Promise<{
        accessToken: string;
        expirationDate: Date;
      }>;
      deviceData: () => Promise<{
        name: string;
        uuid: string;
      }>;
      loadSaveFile: () => Promise<SaveFile>;
      writeSaveFile: (data: SaveFile) => void;
    };
  }

  interface SaveFile {
    devices: { name: string; uuid: string }[];
    beatmaps: {
      id: number;
      metadata: { [key: string]: string };
      downloaded: string[];
    }[];
  }
}

export {};
