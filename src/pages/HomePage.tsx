import { useLocalMapsetIDList } from '../hooks';
import ErrorPage from './ErrorPage';
import './HomePage.css';

function HomePage() {
  const { localIDList, validData } = useLocalMapsetIDList();

  if (validData) {
    return (
      <div className="page">
        <div className="map-filter">Menu</div>
        <div className="map-area">
          <div className="map-info">Map Info</div>
          <div className="map-list">
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
