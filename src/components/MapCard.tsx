import { useState } from 'react';
import './MapCard.css';

function MapCard({
    mapsetID,
    title,
    artist,
    creator,
    downloaded,
    onClick,
}: {
    mapsetID: number;
    title: string;
    artist: string;
    creator: string;
    downloaded: boolean;
    onClick: (data: number) => void;
}) {
    const [active, setActive] = useState<boolean>(false);
    const image = `https://assets.ppy.sh/beatmaps/${mapsetID}/covers/list.jpg`;
    return (
        <div
            className={`map-card ${
                downloaded ? 'map-card-downloaded' : 'map-card-not-downloaded'
            }`}
            role="button"
            tabIndex={-1}
            onClick={() => {
                if (!active) onClick(mapsetID);
                setActive(true);
            }}
            onKeyDown={() => {}}
            onBlur={() => setActive(false)}
        >
            <img
                className="map-card-cover"
                src={image}
                alt={`${title} cover`}
            />
            <div className="map-card-data">
                <p className="map-card-title">{title}</p>
                <p className="map-card-info">{`${artist} // ${creator}`}</p>
            </div>
        </div>
    );
}

export default MapCard;
