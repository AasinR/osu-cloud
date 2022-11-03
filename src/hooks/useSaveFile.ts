import { useEffect, useState } from 'react';
import { addMaps, filterMaps, updateDeviceList } from 'utils/data';

function useSaveFile() {
  const [saveFile, setSaveFile] = useState<SaveFile>();
  const [device, setDevice] = useState<Device>();

  const updateMapList = async (saveData: BeatMap[], currDevice: Device) => {
    const localData: LocalBeatmap[] = await window.electron.localDataList();
    let updated: BeatMap[] = filterMaps(saveData, localData, currDevice);
    updated = addMaps(updated, localData, currDevice);
    return updated;
  };

  // initialize states
  useEffect(() => {
    (async () => {
      const currDevice: Device = await window.electron.deviceData();
      const saveData: SaveFile = await window.electron.loadSaveFile();
      saveData.devices = updateDeviceList(saveData.devices, currDevice);
      saveData.beatmaps = await updateMapList(saveData.beatmaps, currDevice);
      saveData.beatmaps.sort((a: BeatMap, b: BeatMap) =>
        a.id > b.id ? 1 : -1
      );
      setDevice(currDevice);
      setSaveFile(saveData);
      window.electron.writeSaveFile(saveData);
    })();
  }, []);

  return { saveFile, device };
}

export default useSaveFile;
