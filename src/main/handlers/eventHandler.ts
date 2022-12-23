/* eslint-disable @typescript-eslint/no-unused-vars */
import fileHandler from './fileHandler';

/**
 * Returns local map set meta data array.
 */
function localDataList(): LocalBeatmap[] {
    return fileHandler.getLocalDataList();
}

async function loadSaveFile(): Promise<SaveFile> {
    // eslint-disable-next-line @typescript-eslint/return-await
    return await fileHandler.loadSaveFile();
}

function writeSaveFile(event: Electron.IpcMainInvokeEvent, data: SaveFile) {
    fileHandler.writeSaveFile(data);
}

const eventHandler = {
    localDataList,
    loadSaveFile,
    writeSaveFile,
};

export default eventHandler;
