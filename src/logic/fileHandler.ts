import fs from 'fs';

/**
 * Returns an array of local mapset IDs.
 */
function getLocalMapsetIDList(path: string): number[] {
  const mapsetList: string[] = fs.readdirSync(path);
  const idList: number[] = [];

  mapsetList.forEach((item: string) => {
    const id: string = item.split(' ')[0];
    if (!Number.isNaN(id)) idList.push(parseInt(id, 10));
  });

  return [...new Set(idList)];
}

const fileHandler = {
  getLocalMapsetIDList,
};

export default fileHandler;
