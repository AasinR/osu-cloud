import { fileManager } from '../logic';
import './HomePage.css';

function HomePage() {
  const localMapIDs = fileManager.getLocalMapsetIDs();

  return (
    <div className="page">
      <div className="map-list">map list</div>
    </div>
  );
}

export default HomePage;
