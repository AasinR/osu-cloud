import { useEffect, useState } from 'react';

function useSaveFile() {
  const [saveFile, setSaveFile] = useState<SaveFile>();
  const [device, setDevice] = useState<Device>();

  // initialize states
  useEffect(() => {
    (async () => {
      const currentDevice: Device = await window.electron.deviceData();
      setDevice(currentDevice);
      const saveData: SaveFile = await window.electron.loadSaveFile();
      setSaveFile(saveData);
    })();
  }, []);

  return { saveFile, device };
}

export default useSaveFile;
