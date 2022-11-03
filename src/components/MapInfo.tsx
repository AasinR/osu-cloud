import './MapInfo.css';

function MapInfo({ map }: { map: BeatMap }) {
  const cover = `https://assets.ppy.sh/beatmaps/${map.id}/covers/cover.jpg`;
  return (
    <div className="map-info-container">
      <img
        className="map-info-cover"
        src={cover}
        alt={`${map.metadata.Title} cover`}
      />
      <div className="map-info-data">
        <p className="map-info-title">{map.metadata.Title}</p>
        <p className="map-info-artist">{`${map.metadata.Artist} // ${map.metadata.Creator}`}</p>
        <p>Downloaded:</p>
        {map.downloaded.map((device: string) => {
          return <p key={device}>{device}</p>;
        })}
      </div>
    </div>
  );
}

export default MapInfo;
