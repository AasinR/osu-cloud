import { fileManager } from '../logic';
import './HomePage.css';

function HomePage() {
  const localMapIDs = fileManager.getLocalMapsetIDs();

  return (
    <div className="page">
      <div className="map-list">
        {localMapIDs.map((item) => {
          return <p key={item}>{item}</p>;
        })}
      </div>
    </div>
  );
}

export default HomePage;
