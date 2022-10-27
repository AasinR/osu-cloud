import { useState } from 'react';
import { useLocalDataList } from 'hooks';
import { MapCard, MapInfo } from 'components';
import './HomePage.css';

function HomePage() {
  const [activeMap, setActiveMap] = useState<{
    id: number;
    metaData: { [key: string]: string };
  } | null>(null);
  const { localData } = useLocalDataList();

  return (
    <div className="page">
      <div className="map-filter">Menu</div>
      <div className="map-area">
        <div className="map-info">
          {activeMap ? <MapInfo map={activeMap} /> : ''}
        </div>
        <div className="map-list">
          {localData.map((item) => {
            return (
              <MapCard
                key={item.id}
                mapsetID={item.id}
                title={item.metaData.Title}
                artist={item.metaData.Artist}
                creator={item.metaData.Creator}
                onClick={(mapsetID: number) => {
                  const map = localData.find((obj) => {
                    return obj.id === mapsetID;
                  });
                  if (map) setActiveMap(map);
                  console.log(mapsetID);
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
