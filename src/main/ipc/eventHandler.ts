import { shell, dialog } from 'electron';
import { getDeviceInfo } from '../utils/systemUtils';
import { findOsuFolder, osuExists } from '../utils/osuUtils';
import { isValidCredentials, saveCredentials } from '../utils/cloudUtils';
import SettingsController from '../controllers/SettingsController';
import SaveFileController from '../controllers/SaveFileController';
import StartController from '../controllers/StartController';

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
    if (SaveFileController.saveData === null) {
        throw new Error('Save data is not loaded');
    }
    await SaveFileController.update();
    return SaveFileController.saveData;
}

/**
 * Checks if the stored GamePath is valid. If not, tries to check the default locations.
 */
export function checkGameFolder(): boolean {
    if (
        !SettingsController.settings.GamePath ||
        !osuExists(SettingsController.settings.GamePath)
    ) {
        const gamePath: string | null = findOsuFolder();
        if (gamePath === null) return false;
        SettingsController.settings.GamePath = gamePath;
        SettingsController.save();
    }
    return true;
}

/**
 * Requests the loaded settings data.
 */
export function requestSettings(): SettingsData {
    return SettingsController.settings;
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
        SettingsController.settings[key] = value;
    } else SettingsController.settings = key;
    SettingsController.save();
}

/**
 * Set cloud save service to Google Drive.
 */
export async function selectGoogleDrive(
    event: Electron.IpcMainInvokeEvent,
    filePath: string
): Promise<boolean> {
    const valid = await isValidCredentials(filePath);
    if (!valid) return false;
    saveCredentials(filePath);
    SettingsController.settings.CloudServiceType = 'GoogleDrive';
    SettingsController.save();
    StartController.selectCloudController();
    await StartController.load();
    return true;
}
