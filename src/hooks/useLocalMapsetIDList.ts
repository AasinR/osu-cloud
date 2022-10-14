import { useState, useEffect } from 'react';

/**
 * Fetch mapset IDs from the device.
 */
function useLocalMapsetIDList() {
  const [localIDList, setLocalIDList] = useState<number[]>([]);
  const [validData, setValidData] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const result = await window.electron.localMapsetIDList();
      setLocalIDList(result.localIDList);
      setValidData(result.validData);
    })();
  }, []);

  return { localIDList, validData };
}

export default useLocalMapsetIDList;
