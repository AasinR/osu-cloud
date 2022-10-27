import './MapInfo.css';

function MapInfo({
  map,
}: {
  map: { id: number; metaData: { [key: string]: string } };
}) {
  const cover = `https://assets.ppy.sh/beatmaps/${map.id}/covers/cover.jpg`;
  return (
    <div className="map-info-container">
      <img
        className="map-info-cover"
        src={cover}
        alt={`${map.metaData.Title} cover`}
      />
      <div className="map-info-data">
        <p className="map-info-title">{map.metaData.Title}</p>
        <p className="map-info-artist">{`${map.metaData.Artist} // ${map.metaData.Creator}`}</p>
      </div>
    </div>
  );
}

export default MapInfo;
