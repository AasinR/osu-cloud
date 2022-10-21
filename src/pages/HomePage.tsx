import { useContext } from 'react';
import { TokenContext } from 'utils/contexts';
import { useLocalMapsetIDList } from 'hooks';
import { MapCard } from 'components';
import ErrorPage from './ErrorPage';
import './HomePage.css';

function HomePage() {
  const { localIDList, validData } = useLocalMapsetIDList();
  const accessToken = useContext(TokenContext);

  if (validData) {
    return (
      <div className="page">
        <div className="map-filter">Menu</div>
        <div className="map-area">
          <div className="map-info">Map Info</div>
          <div className="map-list">
            <MapCard
              key={593620}
              id={593620}
              title="sample text"
              author="sample text"
            />
            Map List
            {localIDList.map((item) => {
              return <p key={item}>{item}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }
  return <ErrorPage />;
}

export default HomePage;
