import { useEffect, useState } from 'react';
import { useSaveFile } from 'hooks';
import { MapCard, MapInfo, SearchFilter } from 'components';
import { sortMaps } from 'utils/data';
import './HomePage.css';

function HomePage() {
  const { saveFile, device } = useSaveFile();
  const [activeMap, setActiveMap] = useState<BeatMap | null>(null);
  const [mapList, setMapList] = useState<BeatMap[]>([]);

  useEffect(() => {
    if (saveFile) {
      setMapList(sortMaps([...saveFile.beatmaps], 'Title', false));
    }
  }, [saveFile]);

  return (
    <div className="page">
      <div className="map-filter">Menu</div>
      <div className="map-area">
        <div className="map-info">
          {activeMap && saveFile ? (
            <MapInfo map={activeMap} devices={saveFile.devices} />
          ) : (
            ''
          )}
        </div>
        <div className="map-list">
          <SearchFilter devices={saveFile ? saveFile.devices : []} />
          {mapList.map((item) => {
            return (
              <MapCard
                key={item.id}
                mapsetID={item.id}
                title={item.metadata.Title}
                artist={item.metadata.Artist}
                creator={item.metadata.Creator}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                downloaded={item.downloaded.includes(device!.uuid)}
                onClick={(mapsetID: number) => {
                  const map = mapList.find((obj) => {
                    return obj.id === mapsetID;
                  });
                  if (map) setActiveMap(map);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
