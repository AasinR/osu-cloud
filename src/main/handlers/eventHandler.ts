/* eslint-disable @typescript-eslint/no-unused-vars */
import si from 'systeminformation';
import { shell } from 'electron';
import os from 'os';
import fileHandler from './fileHandler';
import osu from './osu';

/**
 * Open url in the browser.
 */
function openExternal(event: Electron.IpcMainInvokeEvent, url: string) {
  shell.openExternal(url);
}

/**
 * Returns local mapset meta data array.
 */
function localDataList(event: Electron.IpcMainInvokeEvent): LocalBeatmap[] {
  const localData: LocalBeatmap[] = fileHandler.getLocalDataList();
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
async function deviceData(event: Electron.IpcMainInvokeEvent): Promise<Device> {
  const name: string = os.hostname();
  const uuid: string = (await si.uuid()).hardware;
  return { name, uuid };
}

async function loadSaveFile(
  event: Electron.IpcMainInvokeEvent
): Promise<SaveFile> {
  const data = await fileHandler.loadSaveFile();
  return data;
}

function writeSaveFile(event: Electron.IpcMainInvokeEvent, data: SaveFile) {
  fileHandler.writeSaveFile(data);
}

const eventHandler = {
  openExternal,
  localDataList,
  getAccessToken,
  deviceData,
  loadSaveFile,
  writeSaveFile,
};

export default eventHandler;
