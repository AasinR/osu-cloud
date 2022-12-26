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

    const handleCardClick = (beatmap: Beatmap) => {
        setSelected(beatmap);
    };

    if (loading) return <LoadingPage />;
    return (
        <div className="page">
            <div className="map-info">
                {selected ? (
                    <MapInfo map={selected} devices={saveData?.devices ?? []} />
                ) : (
                    ''
                )}
            </div>
            <div className="map-list">
                <SearchFilter
                    devices={saveData?.devices ?? []}
                    searchList={saveData?.beatmaps ?? []}
                    onSearch={handleSearch}
                />
                {viewList?.map((item: Beatmap) => {
                    return (
                        <MapCard
                            key={item.id}
                            beatmap={item}
                            downloaded={item.downloaded.includes(
                                device?.uuid ?? ''
                            )}
                            selected={selected?.id === item.id}
                            onClick={handleCardClick}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default HomePage;
