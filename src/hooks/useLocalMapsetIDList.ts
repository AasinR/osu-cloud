import { useState } from 'react';
import fs from 'fs';

/**
 * Fetch mapset IDs from the device.
 */
function useLocalMapsetIDList() {
  const [localIDList, setLocalIDList] = useState<number>();
  const [validData, setValidData] = useState<boolean>(false);

  const path = `${process.env.LOCALAPPDATA}\\osu!\\Songs`;

  if (fs.existsSync(path)) {
    setValidData(true);
  }

  return { localIDList, validData };
}

export default useLocalMapsetIDList;
