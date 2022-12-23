import { hostname } from 'os';
import { readdirSync } from 'fs';
import { uuid } from 'systeminformation';

/**
 * Gets the device information.
 */
export async function getDeviceInfo(): Promise<Device> {
    return {
        name: hostname(),
        uuid: (await uuid()).hardware,
    };
}

/**
 * Locates the first file inside the folder with the given regex.
 */
export function locateFile(dirPath: string, regex: RegExp): string {
    const folder = readdirSync(dirPath);
    const targetFile = folder.find((file: string) => regex.test(file));
    if (!targetFile) {
        throw new Error(
            `Could not find file with the given regex ${regex} in the ${dirPath} folder`
        );
    }
    return `${dirPath}\\${targetFile}`;
}

/**
 * Removes given item from the given array.
 */
export function removeItem<T>(arr: Array<T>, value: T) {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
}
