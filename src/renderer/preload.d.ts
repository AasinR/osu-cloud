declare global {
  interface Window {
    electron: {
      localMapsetIDList: () => Promise<{
        validData: boolean;
        localIDList: number[];
      }>;
    };
  }
}

export {};
