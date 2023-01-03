import { shell, dialog } from 'electron';
import { getDeviceInfo, removeItem } from '../utils/systemUtils';
import { findOsuFolder, getLocalBeatmaps, osuExists } from '../utils/osuUtils';
import {
    existsSaveFile,
    loadSaveFile,
    newSaveFile,
    writeSaveFile,
    writeSettings,
} from '../utils/saveUtils';
import { getSettings } from '../../shared/data/settings';

/**
 * Requests the loaded settings data.
 */
export function requestSettings(): SettingsData {
    return getSettings();
}

/**
 * Sets the settings data.
 */
export function setSettings(
    event: Electron.IpcMainInvokeEvent,
    key: string | SettingsData,
    value?: unknown
) {
    if (typeof key === 'string') {
        if (typeof value === 'undefined') {
            throw new Error('A value must be provided with key');
        }
        getSettings()[key] = value;
        writeSettings(getSettings());
    } else writeSettings(key);
}

/**
 * Opens the given url in the browser.
 */
export function openExternal(event: Electron.IpcMainInvokeEvent, url: string) {
    shell.openExternal(url).catch((error) => {
        throw error;
    });
}

/**
 * Opens a folder selection menu and returns the path of the selected folder.
 */
export function showDialog(
    event: Electron.IpcMainInvokeEvent,
    type: 'openFile' | 'openDirectory'
): string {
    const result = dialog.showOpenDialogSync({
        properties: [type],
    });
    if (result) return result[0];
    return '';
}

/**
 * Returns the device name and the unique hardware UUID.
 */
export function getDevice(): Promise<Device> {
    return getDeviceInfo();
}

/**
 * Updates the save file data then returns it.
 */
export async function getSaveData(): Promise<SaveData> {
    // if the save file doesn't exist, create a new
    if (!existsSaveFile()) return newSaveFile();

    const currentDevice: Device = await getDeviceInfo();
    const localData: LocalBeatmap[] = getLocalBeatmaps();
    const saveData: SaveData = loadSaveFile();

    // update device list
    const foundDevice = saveData.devices.find(
        (device: Device) => device.uuid === currentDevice.uuid
    );
    if (foundDevice) foundDevice.name = currentDevice.name;
    else saveData.devices.push(currentDevice);

    // sort devices by name
    saveData.devices.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });

    // update downloads info and remove redundant beatmaps
    saveData.beatmaps.forEach((saved: Beatmap) => {
        const downloaded: boolean = saved.downloaded.includes(
            currentDevice.uuid
        );
        const found = localData.find(
            (item: LocalBeatmap) => item.id === saved.id
        );
        if (!found && downloaded) {
            removeItem(saved.downloaded, currentDevice.uuid);
            if (!saved.downloaded.length) removeItem(saveData.beatmaps, saved);
        }
        if (found && !downloaded) {
            saved.downloaded.push(currentDevice.uuid);
        }
    });

    // add new beatmaps from local
    localData.forEach((local: LocalBeatmap) => {
        const found = saveData.beatmaps.find(
            (item: Beatmap) => item.id === local.id
        );
        if (!found) {
            saveData.beatmaps.push({
                id: local.id,
                metadata: local.metadata,
                downloaded: [currentDevice.uuid],
            });
        }
    });

    // sort beatmap array by id
    saveData.beatmaps.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    });

    // write data into the save file
    writeSaveFile(saveData);
    return saveData;
}

/**
 * Checks if the stored GamePath is valid. If not, tries to check the default locations.
 */
export function checkGameFolder(): boolean {
    if (!getSettings().GamePath || !osuExists(getSettings().GamePath)) {
        const gamePath: string | null = findOsuFolder();
        if (gamePath === null) return false;
        getSettings().GamePath = gamePath;
    }
    writeSettings(getSettings());
    return true;
}
