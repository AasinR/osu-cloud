/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';
import fileHandler from './fileHandler';
import osu from './osu';

/**
 * Checks if the folder exists and returns the local mapset ID array.
 */
function localMapsetIDList(event: Electron.IpcMainInvokeEvent): {
  validData: boolean;
  localIDList: number[];
} {
  const path = `${process.env.LOCALAPPDATA}\\osu!\\Songs`;
  const localIDList: number[] = [];
  let validData = false;

  if (fs.existsSync(path)) {
    validData = true;
    const test = fileHandler.getLocalMapsetIDList(path);
  }

  return { validData, localIDList };
}

/**
 * Returns a client credential token.
 */
async function getAccessToken(event: Electron.IpcMainInvokeEvent): Promise<{
  accessToken: string;
  expirationDate: Date;
}> {
  const response = await osu.getAccessToken();
  const accessToken: string = response.access_token;
  const expirationDate: Date = new Date(
    new Date().getTime() + response.expires_in * 1000
  );
  return { accessToken, expirationDate };
}

const eventHandler = {
  localMapsetIDList,
  getAccessToken,
};

export default eventHandler;
