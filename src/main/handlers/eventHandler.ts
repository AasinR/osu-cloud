/* eslint-disable @typescript-eslint/no-unused-vars */
import si from 'systeminformation';
import os from 'os';
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

/**
 * Get device name and unique hardware UUID
 */
async function deviceData(event: Electron.IpcMainInvokeEvent): Promise<{
  name: string;
  uuid: string;
}> {
  const name: string = os.hostname();
  const uuid: string = (await si.uuid()).hardware;
  return { name, uuid };
}

const eventHandler = {
  localDataList,
  getAccessToken,
  deviceData,
};

export default eventHandler;
