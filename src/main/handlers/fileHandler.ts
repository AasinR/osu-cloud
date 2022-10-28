import fs from 'fs';
import os from 'os';
import path from 'path';
import si from 'systeminformation';

const OsuPath = `${process.env.LOCALAPPDATA}\\osu!\\Songs`;
const SaveFilePath = `${path.resolve('./')}\\data`;

/**
 * Get mapset metadata inside given directory
 */
function readMetaData(dirPath: string) {
  const fileName: string = fs
    .readdirSync(dirPath)
    .filter((item) => item.match(/.osu$/))[0];

  const file: string = fs.readFileSync(`${dirPath}\\${fileName}`).toString();
  const content: string = file.substring(
    file.indexOf('[Metadata]'),
    file.indexOf('[Difficulty]')
  );
  const metaData: { [key: string]: string } = {};

  content.split('\n').forEach((item: string) => {
    const data: string = item.trim();
    if (data === '[Metadata]' || data === '') return;
    const index: number = data.indexOf(':');
    const key: string = data.substring(0, index);
    const value: string = data.substring(index + 1);
    metaData[key] = value;
  });
  return metaData;
}

/**
 * Returns an array of local mapset IDs and metadata.
 */
function getLocalDataList(): {
  id: number;
  metaData: { [key: string]: string };
}[] {
  const dirNames: string[] = fs.readdirSync(OsuPath);
  const mapsetList: { id: number; metaData: { [key: string]: string } }[] = [];

  dirNames.forEach((item: string) => {
    const id: string = item.split(' ')[0];
    if (!Number.isNaN(id)) {
      mapsetList.push({
        id: parseInt(id, 10),
        metaData: readMetaData(`${OsuPath}\\${item}`),
      });
    }
  });

  return [...new Map(mapsetList.map((item) => [item.id, item])).values()];
}

/**
 * Writes given data to save file, else creates a new save.
 */
async function writeSaveFile(data?: SaveFile) {
  let saveString: string;
  if (data === undefined) {
    const device = { name: os.hostname(), uuid: (await si.uuid()).hardware };
    const mapsets = getLocalDataList();
    const beatmaps: SaveFile['beatmaps'] = [];
    mapsets.forEach((map) => {
      beatmaps.push({
        id: map.id,
        metadata: map.metaData,
        downloaded: [device.uuid],
      });
    });
    const newSave: SaveFile = {
      devices: [device],
      beatmaps,
    };
    saveString = JSON.stringify(newSave);
  } else saveString = JSON.stringify(data);
  fs.writeFile(SaveFilePath, saveString, (error) => {
    if (error) throw error;
  });
}

/**
 * Returns the save file in JSON format.
 */
async function loadSaveFile(): Promise<SaveFile> {
  if (!fs.existsSync(SaveFilePath)) await writeSaveFile();
  const saveFile: string = fs.readFileSync(SaveFilePath).toString();
  const data: SaveFile = JSON.parse(saveFile);
  return data;
}

const fileHandler = {
  getLocalDataList,
  loadSaveFile,
  writeSaveFile,
};

export default fileHandler;
