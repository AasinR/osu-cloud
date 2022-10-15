declare global {
  interface Window {
    electron: {
      localMapsetIDList: () => Promise<{
        validData: boolean;
        localIDList: number[];
      }>;
      getAccessToken: () => Promise<{
        accessToken: string;
        expirationDate: Date;
      }>;
    };
  }
}

export {};
