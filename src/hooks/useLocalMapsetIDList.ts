import { useState, useEffect } from 'react';
import fs from 'fs';
import { fileHandler } from '../logic';

/**
 * Fetch mapset IDs from the device.
 */
function useLocalMapsetIDList() {
  const [localIDList, setLocalIDList] = useState<number[]>([]);
  const [validData, setValidData] = useState<boolean>(false);

  const path = `${process.env.LOCALAPPDATA}\\osu!\\Songs`;

  useEffect(() => {
    if (fs.existsSync(path)) {
      setValidData(true);
      setLocalIDList(fileHandler.getLocalMapsetIDList(path));
    }
  }, [path]);

  return { localIDList, validData };
}

export default useLocalMapsetIDList;
