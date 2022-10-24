/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';
import fileHandler from './fileHandler';
import osu from './osu';

/**
 * Returns local mapset meta data array.
 */
function localDataList(
  event: Electron.IpcMainInvokeEvent
): { id: number; metaData: { [key: string]: string } }[] {
  const path = `${process.env.LOCALAPPDATA}\\osu!\\Songs`;
  const localData: { id: number; metaData: { [key: string]: string } }[] =
    fileHandler.getLocalDataList(path);

  return localData;
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
  localDataList,
  getAccessToken,
};

export default eventHandler;
