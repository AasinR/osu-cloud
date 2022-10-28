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
    };
  }
}

export {};
