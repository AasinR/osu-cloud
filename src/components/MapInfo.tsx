import { useEffect, useState } from 'react';
import './MapInfo.css';

function MapInfo({
    map,
    currentDevice,
    devices,
}: {
    map: Beatmap;
    currentDevice: Device['uuid'];
    devices: Device[];
}) {
    const [deviceList, setDeviceList] = useState<
        { device: Device; downloaded: boolean }[]
    >([]);
    const cover = `https://assets.ppy.sh/beatmaps/${map.id}/covers/cover.jpg`;

    useEffect(() => {
        (async () => {
            const dev: { device: Device; downloaded: boolean }[] = [];

            devices.forEach((device: Device) => {
                const downloaded: boolean = map.downloaded.includes(
                    device.uuid
                );
                dev.push({
                    device: {
                        uuid: device.uuid,
                        name: `${device.name}${
                            device.uuid === currentDevice ? ' (Current)' : ''
                        }`,
                    },
                    downloaded,
                });
            });
            setDeviceList(dev);
        })();
    }, [currentDevice, devices, map]);

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
                <div className="map-info-downloads">
                    <p>Devices:</p>
                    <ul className="map-info-downloads-list">
                        {deviceList.map(
                            (obj: { device: Device; downloaded: boolean }) => {
                                return (
                                    <li
                                        className={`map-info-downloads-item${
                                            obj.downloaded
                                                ? ' map-info-downloads-item-downloaded'
                                                : ' map-info-downloads-item-not-downloaded'
                                        }`}
                                        key={obj.device.uuid}
                                    >
                                        {obj.device.name}
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </div>
                <button
                    className="map-info-button"
                    type="button"
                    onClick={() => {
                        window.electron.openExternal(
                            `https://osu.ppy.sh/beatmapsets/${map.id}`
                        );
                    }}
                >
                    Open in browser
                </button>
            </div>
        </div>
    );
}

export default MapInfo;
