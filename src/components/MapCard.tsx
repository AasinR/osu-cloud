import './MapCard.css';

function MapCard({
    beatmap,
    downloaded,
    selected,
    onClick,
}: {
    beatmap: Beatmap;
    downloaded: boolean;
    selected: boolean;
    onClick: (beatmap: Beatmap) => void;
}) {
    const image = `https://assets.ppy.sh/beatmaps/${beatmap.id}/covers/list.jpg`;
    return (
        <div
            className={`map-card map-card-${
                downloaded ? 'downloaded' : 'not-downloaded'
            }${selected ? '-selected' : ''}`}
            role="button"
            tabIndex={-1}
            onClick={() => {
                if (!selected) onClick(beatmap);
            }}
            onKeyDown={() => {}}
        >
            <img
                className="map-card-cover"
                src={image}
                alt={`${beatmap.metadata.Title} cover`}
            />
            <div className="map-card-data">
                <p className="map-card-title">{beatmap.metadata.Title}</p>
                <p className="map-card-info">{`${beatmap.metadata.Artist} // ${beatmap.metadata.Creator}`}</p>
            </div>
        </div>
    );
}

export default MapCard;
