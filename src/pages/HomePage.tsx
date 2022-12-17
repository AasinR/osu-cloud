import { useEffect, useState } from 'react';
import { useSaveFile } from 'hooks';
import { MapCard, MapInfo, SearchFilter } from 'components';
import { sortMaps } from 'utils/data';
import './HomePage.css';

function HomePage() {
    const { saveFile, device } = useSaveFile();
    const [activeMap, setActiveMap] = useState<BeatMap>();
    const [mapList, setMapList] = useState<BeatMap[]>([]);
    const [filteredList, setFilteredList] = useState<BeatMap[]>([]);

    useEffect(() => {
        if (saveFile) {
            const list = sortMaps([...saveFile.beatmaps], 'Title', false);
            setMapList(list);
            setFilteredList(list);
        }
    }, [saveFile]);

    const handleSearch = (result: BeatMap[]) => {
        setFilteredList(result);
    };

    const handleCardClick = (mapsetID: number) => {
        const map = mapList.find((obj) => {
            return obj.id === mapsetID;
        });
        if (map) setActiveMap(map);
    };

    return (
        <div className="page">
            <div className="map-filter">Menu</div>
            <div className="map-area">
                <div className="map-info">
                    {activeMap && saveFile ? (
                        <MapInfo map={activeMap} devices={saveFile.devices} />
                    ) : (
                        ''
                    )}
                </div>
                <div className="map-list">
                    <SearchFilter
                        devices={saveFile ? saveFile.devices : []}
                        searchList={mapList}
                        onSearch={handleSearch}
                    />
                    {filteredList.map((item) => {
                        return (
                            <MapCard
                                key={item.id}
                                mapsetID={item.id}
                                title={item.metadata.Title}
                                artist={item.metadata.Artist}
                                creator={item.metadata.Creator}
                                downloaded={item.downloaded.includes(
                                    device?.uuid as string
                                )}
                                onClick={handleCardClick}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
