import './MapCard.css';

function MapCard({
  id,
  title,
  author,
}: {
  id: number;
  title: string;
  author: string;
}) {
  const image = `https://assets.ppy.sh/beatmaps/${id}/covers/list.jpg`;
  return (
    <div className="map-card">
      <img className="map-card-cover" src={image} alt={`${title} cover`} />
      <div className="map-card-data">
        <p className="map-card-title">{title}</p>
        <p className="map-card-author">{author}</p>
      </div>
    </div>
  );
}

export default MapCard;
