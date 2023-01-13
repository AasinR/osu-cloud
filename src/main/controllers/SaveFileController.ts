import { existsSync, readFileSync, writeFileSync } from 'fs';
import { SAVE_FILE } from '../data/paths';
import { getDeviceInfo, removeItem } from '../utils/systemUtils';
import { getLocalBeatmaps } from '../utils/osuUtils';

class SaveFileController {
    private static instance: SaveFileController;

    public saveData: SaveData | null = null;

    constructor() {
        // check for existing instance
        if (SaveFileController.instance) {
            return SaveFileController.instance;
        }
        SaveFileController.instance = this;
    }

    /**
     * Read data from the save file.
     */
    async load() {
        if (!existsSync(SAVE_FILE)) {
            // create new save file
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
            this.saveData = {
                devices: [device],
                beatmaps,
            };
        } else {
            // load existing save
            const data = readFileSync(SAVE_FILE).toString();
            this.saveData = JSON.parse(data);
        }
    }

    /**
     * Update save file with local data.
     */
    async update() {
        if (this.saveData === null) {
            throw new Error('Save file is not loaded');
        }
        const currentDevice = await getDeviceInfo();
        const localData = getLocalBeatmaps();

        // update device list
        const foundDevice = this.saveData.devices.find(
            (device: Device) => device.uuid === currentDevice.uuid
        );
        if (foundDevice) foundDevice.name = currentDevice.name;
        else this.saveData.devices.push(currentDevice);

        // sort devices by name
        this.saveData.devices.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        // update downloads info and remove redundant beatmaps
        this.saveData.beatmaps.forEach((saved: Beatmap) => {
            const downloaded: boolean = saved.downloaded.includes(
                currentDevice.uuid
            );
            const found = localData.find(
                (item: LocalBeatmap) => item.id === saved.id
            );
            if (!found && downloaded) {
                removeItem(saved.downloaded, currentDevice.uuid);
                if (!saved.downloaded.length) {
                    removeItem(this.saveData!.beatmaps, saved);
                }
            }
            if (found && !downloaded) {
                saved.downloaded.push(currentDevice.uuid);
            }
        });

        // add new beatmaps from local
        localData.forEach((local: LocalBeatmap) => {
            const found = this.saveData!.beatmaps.find(
                (item: Beatmap) => item.id === local.id
            );
            if (!found) {
                this.saveData!.beatmaps.push({
                    id: local.id,
                    metadata: local.metadata,
                    downloaded: [currentDevice.uuid],
                });
            }
        });

        // sort beatmap array by id
        this.saveData.beatmaps.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
        });

        // write data into the save file
        const dataString = JSON.stringify(this.saveData);
        writeFileSync(SAVE_FILE, dataString);
    }
}

export default new SaveFileController();
