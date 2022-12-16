/* eslint-disable import/prefer-default-export */
import { removeItem } from './utils';

/**
 * Updates downloads and removes redundant beatmaps.
 */
export function filterMaps(
    saveData: BeatMap[],
    local: LocalBeatmap[],
    device: Device
): BeatMap[] {
    const filtered: BeatMap[] = [];
    saveData.forEach((save: BeatMap) => {
        const beatmap: BeatMap = save;
        const downloaded: boolean = save.downloaded.includes(device.uuid);
        let found = false;

        for (let i = 0; i < local.length; i += 1) {
            if (save.id === local[i].id) {
                found = true;
                break;
            }
        }
        if ((!found && !downloaded) || (found && downloaded)) {
            filtered.push(beatmap);
        } else if (!found && downloaded) {
            beatmap.downloaded = removeItem(beatmap.downloaded, device.uuid);
            if (beatmap.downloaded.length) filtered.push(beatmap);
        } else if (found && !downloaded) {
            beatmap.downloaded.push(device.uuid);
            filtered.push(beatmap);
        }
    });
    return filtered;
}

/**
 * Add new beatmaps from local to the save data.
 */
export function addMaps(
    saveData: BeatMap[],
    localData: LocalBeatmap[],
    device: Device
): BeatMap[] {
    const beatmaps: BeatMap[] = saveData;
    localData.forEach((local: LocalBeatmap) => {
        let found = false;
        for (let i = 0; i < saveData.length; i += 1) {
            if (local.id === saveData[i].id) {
                found = true;
                break;
            }
        }
        if (found) return;
        beatmaps.push({
            id: local.id,
            metadata: local.metadata,
            downloaded: [device.uuid],
        });
    });

    return beatmaps;
}

/**
 * Updates the device name or adds new device.
 */
export function updateDeviceList(devices: Device[], current: Device): Device[] {
    const updated: Device[] = devices;
    let found = false;
    for (let i = 0; i < devices.length; i += 1) {
        if (devices[i].uuid === current.uuid) {
            found = true;
            updated[i].name = current.name;
            break;
        }
    }
    if (!found) updated.push(current);
    return updated;
}

export function sortMaps(
    beatmaps: BeatMap[],
    type: string, // Title | Artist | Creator
    reverse = false
): BeatMap[] {
    if (reverse) {
        beatmaps.sort((a: BeatMap, b: BeatMap) =>
            a.metadata[type].toLowerCase() > b.metadata[type].toLowerCase()
                ? -1
                : 1
        );
    } else {
        beatmaps.sort((a: BeatMap, b: BeatMap) =>
            a.metadata[type].toLowerCase() > b.metadata[type].toLowerCase()
                ? 1
                : -1
        );
    }
    return beatmaps;
}
