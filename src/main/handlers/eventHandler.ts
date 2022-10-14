/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';
import fileHandler from './fileHandler';

/**
 * Checks if the folder exists and returns the local mapset ID array.
 */
function localMapsetIDList(event: Electron.IpcMainInvokeEvent): {
  validData: boolean;
  localIDList: number[];
} {
  const path = `${process.env.LOCALAPPDATA}\\osu!\\Songs`;
  let localIDList: number[] = [];
  let validData = false;

  if (fs.existsSync(path)) {
    validData = true;
    localIDList = fileHandler.getLocalMapsetIDList(path);
  }

  return { validData, localIDList };
}

const eventHandler = {
  localMapsetIDList,
};

export default eventHandler;
