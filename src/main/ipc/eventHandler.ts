import { shell, dialog } from 'electron';
import { getDeviceInfo, removeItem } from '../utils/systemUtils';
import { getLocalBeatmaps } from '../utils/osuUtils';
import { loadSaveFile } from '../utils/saveUtils';

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
export function selectFolder(): string {
    const result = dialog.showOpenDialogSync({
        properties: ['openDirectory'],
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

export async function getSaveData() {
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

    // TODO: update save file with local data
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

    // TODO: write new data into file
}
