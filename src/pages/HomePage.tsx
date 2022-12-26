import { useCallback, useEffect, useState } from 'react';
import { MapCard, MapInfo, SearchFilter } from 'components';
import LoadingPage from './LoadingPage';
import './HomePage.css';

function HomePage() {
    const [saveData, setSaveData] = useState<SaveData>();
    const [viewList, setViewList] = useState<Beatmap[]>();
    const [selected, setSelected] = useState<Beatmap>();
    const [device, setDevice] = useState<Device>();
    const [loading, setLoading] = useState<boolean>(true);

    // loads the data before rendering the page
    async function loadPage() {
        setLoading(true);
        const saved: SaveData = await window.electron.getSaveData();
        setSaveData(saved);
        setViewList([...saved.beatmaps]);
        setDevice(await window.electron.getDevice());
        setLoading(false);
    }

    useEffect(() => {
        loadPage();
    }, []);

    const handleSearch = useCallback((result: Beatmap[]) => {
        setViewList(result);
    }, []);

    const handleCardClick = (mapsetID: number) => {
        const map = saveData?.beatmaps.find((obj) => {
            return obj.id === mapsetID;
        });
        if (map) setSelected(map);
    };

    if (loading) return <LoadingPage />;
    return (
        <div className="page">
            <div className="map-info">
                {selected ? (
                    <MapInfo map={selected} devices={saveData!.devices} />
                ) : (
                    ''
                )}
            </div>
            <div className="map-list">
                <SearchFilter
                    devices={saveData!.devices}
                    searchList={saveData!.beatmaps}
                    onSearch={handleSearch}
                />
                {viewList!.map((item) => {
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
    );
}

export default HomePage;
