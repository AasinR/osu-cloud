import { useState, useEffect } from 'react';

/**
 * Fetch mapset meta data from the device.
 */
function useLocalDataList() {
  const [localData, setLocalData] = useState<
    { id: number; metaData: { [key: string]: string } }[]
  >([]);

  useEffect(() => {
    (async () => {
      const data = await window.electron.localDataList();
      setLocalData(data);
    })();
  }, []);

  return { localData };
}

export default useLocalDataList;
