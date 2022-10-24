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
    };
  }
}

export {};
