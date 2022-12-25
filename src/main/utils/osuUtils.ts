import { homedir } from 'os';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { locateFile } from './systemUtils';

/**
 * Tries to locate the osu! folder in the default locations.
 */
export function findOsuFolder(): string | null {
    // windows
    let folderPath = `${homedir()}/AppData/Local/osu!/`;
    if (existsSync(folderPath)) {
        return folderPath;
    }

    // linux or macOS
    folderPath = `${homedir()}/osu!/`;
    if (existsSync(folderPath)) {
        return folderPath;
    }
    return null;
}

/**
 * Get beatmap metadata from the given folder.
 */
export function getMetadata(dirPath: string): BeatmapMetadata {
    const osuFile = locateFile(dirPath, /\.osu$/);
    const osuFileContents = readFileSync(osuFile, 'utf8');

    const metadata: BeatmapMetadata = {
        Title: '',
        Artist: '',
        Creator: '',
    };
    osuFileContents.split('\n').forEach((line) => {
        const parts = line.split(':');
        const key = parts[0];
        const value = parts[1];
        switch (key) {
            case 'Title':
                metadata.Title = value;
                break;
            case 'Artist':
                metadata.Artist = value;
                break;
            case 'Creator':
                metadata.Creator = value;
                break;
            default:
                break;
        }
    });
    return metadata;
}

/**
 * Returns the local unique beatmaps.
 */
export function getLocalBeatmaps(): LocalBeatmap[] {
    // TODO: rewrite path to 'global.settings.gamePath'
    const OSU_PATH = `${homedir()}/AppData/Local/osu!/Songs/`;

    const folders: string[] = readdirSync(OSU_PATH);
    const beatmaps: LocalBeatmap[] = [];

    folders.forEach((item: string) => {
        const id = parseInt(item.split(' ')[0], 10);
        if (!Number.isNaN(id)) {
            beatmaps.push({
                id,
                metadata: getMetadata(`${OSU_PATH}\\${item}`),
            });
        }
    });

    return [...new Map(beatmaps.map((item) => [item.id, item])).values()];
}
