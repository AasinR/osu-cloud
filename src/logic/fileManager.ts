import fs from 'fs';

const path = `${process.env.LOCALAPPDATA}\\osu!\\Songs`;

/**
 * Returns the local mapset IDs
 */
function getLocalMapsetIDs(): number[] {
  const maps = fs.readdirSync(path);
  const mapIDs: number[] = [];

  maps.forEach((item: string) => {
    const id = item.split(' ')[0];
    if (!Number.isNaN(id)) {
      mapIDs.push(parseInt(id, 10));
    }
  });
  return mapIDs;
}

const fileManager = {
  getLocalMapsetIDs,
};

export default fileManager;
