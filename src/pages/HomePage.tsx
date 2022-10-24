import { useContext } from 'react';
import { TokenContext } from 'utils/contexts';
import { useLocalDataList } from 'hooks';
import { MapCard } from 'components';
import './HomePage.css';

function HomePage() {
  const { localData } = useLocalDataList();
  const accessToken = useContext(TokenContext);

  return (
    <div className="page">
      <div className="map-filter">Menu</div>
      <div className="map-area">
        <div className="map-info">Map Info</div>
        <div className="map-list">
          Map List
          {localData.map((item) => {
            return (
              <MapCard
                key={item.id}
                id={item.id}
                title={item.metaData.Title}
                author={item.metaData.Artist}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
