/* eslint-disable @typescript-eslint/no-unused-vars */
import si from 'systeminformation';
import { shell, dialog } from 'electron';
import os from 'os';
import fileHandler from './fileHandler';

/**
 * Open url in the browser.
 */
function openExternal(event: Electron.IpcMainInvokeEvent, url: string) {
    shell.openExternal(url);
}

function selectFolder(): string {
    const result = dialog.showOpenDialogSync({
        properties: ['openDirectory'],
    });
    if (result) return result[0];
    return '';
}

/**
 * Returns local map set meta data array.
 */
function localDataList(): LocalBeatmap[] {
    return fileHandler.getLocalDataList();
}

/**
 * Get device name and unique hardware UUID
 */
async function deviceData(): Promise<Device> {
    const name: string = os.hostname();
    const uuid: string = (await si.uuid()).hardware;
    return { name, uuid };
}

async function loadSaveFile(): Promise<SaveFile> {
    // eslint-disable-next-line @typescript-eslint/return-await
    return await fileHandler.loadSaveFile();
}

function writeSaveFile(event: Electron.IpcMainInvokeEvent, data: SaveFile) {
    fileHandler.writeSaveFile(data);
}

const eventHandler = {
    openExternal,
    selectFolder,
    localDataList,
    deviceData,
    loadSaveFile,
    writeSaveFile,
};

export default eventHandler;
