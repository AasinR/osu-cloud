import fs from 'fs';

/**
 * Get mapset meta data inside given directory
 */
function readMetaData(path: string) {
  const file: string = fs
    .readdirSync(path)
    .filter((item) => item.match(/.osu$/))[0];

  const content: string = fs.readFileSync(`${path}\\${file}`).toString();
  const metaData: string = content.substring(
    content.indexOf('[Metadata]'),
    content.indexOf('[Difficulty]')
  );
  console.log(metaData.split('\n'));
}

/**
 * Returns an array of local mapset IDs.
 */
function getLocalMapsetIDList(
  path: string
): { id: number; title: string; author: string }[] {
  const dirNames: string[] = fs.readdirSync(path);
  const mapsetList: { id: number; title: string; author: string }[] = [];

  dirNames.forEach((item: string) => {
    const id: string = item.split(' ')[0];
    if (!Number.isNaN(id)) {
      //
    }
  });

  readMetaData(`${path}\\50185 Sum 41 - Over My Head (Better Off Dead)`);

  return [...new Set(mapsetList)];
}

const fileHandler = {
  getLocalMapsetIDList,
};

export default fileHandler;
