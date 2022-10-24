import fs from 'fs';

/**
 * Get mapset meta data inside given directory
 */
function readMetaData(path: string) {
  const fileName: string = fs
    .readdirSync(path)
    .filter((item) => item.match(/.osu$/))[0];

  const file: string = fs.readFileSync(`${path}\\${fileName}`).toString();
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
function getLocalDataList(
  path: string
): { id: number; metaData: { [key: string]: string } }[] {
  const dirNames: string[] = fs.readdirSync(path);
  const mapsetList: { id: number; metaData: { [key: string]: string } }[] = [];

  dirNames.forEach((item: string) => {
    const id: string = item.split(' ')[0];
    if (!Number.isNaN(id)) {
      mapsetList.push({
        id: parseInt(id, 10),
        metaData: readMetaData(`${path}\\${item}`),
      });
    }
  });

  return [...new Map(mapsetList.map((item) => [item.id, item])).values()];
}

const fileHandler = {
  getLocalDataList,
};

export default fileHandler;
