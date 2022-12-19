import { homedir } from 'os';
import { existsSync } from 'fs';

export function findOsuFolder(): string | null {
    let folderPath = `${homedir()}/AppData/Local/osu!/`;
    if (existsSync(folderPath)) {
        return folderPath;
    }

    folderPath = `${homedir()}/osu!/`;
    if (existsSync(folderPath)) {
        return folderPath;
    }
    return null;
}
