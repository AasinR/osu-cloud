import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { getDeviceInfo } from './systemUtils';
import { getLocalBeatmaps } from './osuUtils';
import { initSettings } from '../data/settings';
import {
    CREDENTIALS_KEY,
    DATA_FOLDER,
    SAVE_FILE,
    SETTINGS_FILE,
} from '../data/paths';

/**
 * Create the Data folder if it doesn't exist.
 */
export function createDataDir() {
    if (!existsSync(DATA_FOLDER)) {
        mkdirSync(DATA_FOLDER);
    }
}

/**
 * Creates a new settings save file.
 */
export function newSettingsFile() {
    const settingsData: SettingsData = {
        GamePath: '',
        CloudServiceType: '',
    };
    const dataString = JSON.stringify(settingsData);
    writeFileSync(SETTINGS_FILE, dataString);
}

/**
 * Write the given settings data to file and global variable.
 */
export function writeSettings(data: SettingsData) {
    const dataString = JSON.stringify(data);
    writeFileSync(SETTINGS_FILE, dataString);
    initSettings(data);
}

/**
 * Load data from the settings file into global variables.
 */
export function loadSettings() {
    if (!existsSync(SETTINGS_FILE)) newSettingsFile();
    const settingsFile = readFileSync(SETTINGS_FILE).toString();
    initSettings(JSON.parse(settingsFile));
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
    writeFileSync(SAVE_FILE, saveString);
    return newSave;
}

/**
 * Write data into the save file then rename it to update the timestamp.
 */
export function writeSaveFile(data: SaveData) {
    const dataString = JSON.stringify(data);
    writeFileSync(SAVE_FILE, dataString);
}

/**
 * Returns the save file in JSON format.
 */
export function loadSaveFile(): SaveData {
    const data = readFileSync(SAVE_FILE).toString();
    return JSON.parse(data);
}

/**
 * Copy the service account credentials file form the given path.
 */
export function saveCredentials(filePath: string) {
    const data = readFileSync(filePath);
    writeFileSync(CREDENTIALS_KEY, data);
}
