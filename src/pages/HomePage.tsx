import { useState } from 'react';
import { useSaveFile } from 'hooks';
import { MapCard, MapInfo } from 'components';
import './HomePage.css';

function HomePage() {
  const [activeMap, setActiveMap] = useState<BeatMap | null>(null);
  const { saveFile } = useSaveFile();

  return (
    <div className="page">
      <div className="map-filter">Menu</div>
      <div className="map-area">
        <div className="map-info">
          {activeMap ? <MapInfo map={activeMap} /> : ''}
        </div>
        <div className="map-list">
          {saveFile?.beatmaps.map((item) => {
            return (
              <MapCard
                key={item.id}
                mapsetID={item.id}
                title={item.metadata.Title}
                artist={item.metadata.Artist}
                creator={item.metadata.Creator}
                onClick={(mapsetID: number) => {
                  const map = saveFile.beatmaps.find((obj) => {
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
