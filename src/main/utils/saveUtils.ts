import path from 'path';
import {
    existsSync,
    mkdirSync,
    writeFileSync,
    readFileSync,
    renameSync,
} from 'fs';
import { getDeviceInfo, locateFile } from './systemUtils';
import { getLocalBeatmaps } from './osuUtils';
import { initSettings } from '../../shared/data/settings';

// save data paths
const DATA_PATH = `${path.resolve('./')}\\data`;
const SETTINGS_PATH = `${DATA_PATH}\\settings.json`;

/**
 * Create the Data folder if it doesn't exist.
 */
export function createDataDir() {
    if (!existsSync(DATA_PATH)) {
        mkdirSync(DATA_PATH);
    }
}

/**
 * Creates a new settings save file.
 */
export function newSettingsFile() {
    const settingsData: SettingsData = {
        GamePath: '',
    };
    const dataString = JSON.stringify(settingsData);
    writeFileSync(SETTINGS_PATH, dataString);
}

/**
 * Write the given settings data to file and global variable.
 */
export function writeSettings(data: SettingsData) {
    const dataString = JSON.stringify(data);
    writeFileSync(SETTINGS_PATH, dataString);
    initSettings(data);
}

/**
 * Load data from the settings file into global variables.
 */
export function loadSettings() {
    if (!existsSync(SETTINGS_PATH)) newSettingsFile();
    const settingsFile = readFileSync(SETTINGS_PATH).toString();
    initSettings(JSON.parse(settingsFile));
}

/**
 * Checks if a save file exists or not.
 */
export function existsSaveFile(): boolean {
    try {
        locateFile(DATA_PATH, /^osu-save_/);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Create a new save file, then returns it.
 */
export async function newSaveFile(): Promise<SaveData> {
    const device = await getDeviceInfo();
    const localBeatmaps = getLocalBeatmaps();
    const beatmaps: Beatmap[] = [];
    localBeatmaps.forEach((item) => {
        beatmaps.push({
            id: item.id,
            metadata: item.metadata,
            downloaded: [device.uuid],
        });
    });
    // sort beatmap array by id
    beatmaps.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    });
    const newSave: SaveData = {
        devices: [device],
        beatmaps,
    };
    const saveString = JSON.stringify(newSave);
    const fileName = `osu-save_${Date.now()}.json`;
    writeFileSync(`${DATA_PATH}\\${fileName}`, saveString);
    return newSave;
}

/**
 * Write data into the save file then rename it to update the timestamp.
 */
export function writeSaveFile(data: SaveData) {
    const filePath = locateFile(DATA_PATH, /^osu-save_/);
    const dataString = JSON.stringify(data);
    writeFileSync(filePath, dataString);
    const newPath = `${DATA_PATH}\\osu-save_${Date.now()}.json`;
    renameSync(filePath, newPath);
}

/**
 * Returns the save file in JSON format.
 */
export function loadSaveFile(): SaveData {
    const file = locateFile(DATA_PATH, /^osu-save_/);
    const data = readFileSync(file).toString();
    return JSON.parse(data);
}
