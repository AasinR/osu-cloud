import { fileManager } from '../logic';
import './HomePage.css';

function HomePage() {
  const localMapIDs = fileManager.getLocalMapsetIDs();

  return (
    <div className="page">
      <div className="map-filter">Menu</div>
      <div className="map-area">
        <div className="map-info">Map Info</div>
        <div className="map-list">
          Map List
          {localMapIDs.map((item) => {
            return <p key={item}>{item}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
