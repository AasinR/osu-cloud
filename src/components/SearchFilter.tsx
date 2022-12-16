import { useEffect, useState } from 'react';
import { sortMaps } from 'utils/data';
import './SearchFilter.css';
import sortIcon from '../../assets/icons/sort-icon.png'; // https://icons8.com/icons/set/sort-order put it into about section!!!!!

function SearchFilter({
    devices,
    searchList,
    onSearch,
}: {
    devices: Device[];
    searchList: BeatMap[];
    onSearch: (result: BeatMap[]) => void;
}) {
    const sortOptions = [
        { name: 'Title', value: 'Title' },
        { name: 'Artist', value: 'Artist' },
        { name: 'Creator', value: 'Creator' },
    ];

    const deviceOptions = [
        { name: 'All', value: '1' },
        ...devices.map((option) => ({ name: option.name, value: option.uuid })),
    ];

    const [searchValue, setSearchValue] = useState<string>('');
    const [sortFilter, setSortFilter] = useState<string>(sortOptions[0].value);
    const [reverse, setReverse] = useState<boolean>(false);
    const [device, setDevice] = useState<string>(deviceOptions[0].value);

    // search runs when a value changes
    useEffect(() => {
        const searchWord = searchValue.toLowerCase();
        const result: BeatMap[] = searchList.filter((value: BeatMap) => {
            return (
                (device === '1' || value.downloaded.includes(device)) &&
                (value.metadata.Title.toLowerCase().includes(searchWord) ||
                    value.metadata.Artist.toLowerCase().includes(searchWord) ||
                    value.metadata.Creator.toLowerCase().includes(searchWord))
            );
        });
        onSearch(sortMaps(result, sortFilter, reverse));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [device, reverse, searchList, searchValue, sortFilter]);

    return (
        <div className="search-filter">
            <div className="search-bar">
                <input
                    className="search-bar-input"
                    type="text"
                    placeholder="Search..."
                    spellCheck={false}
                    value={searchValue}
                    onChange={(event) => {
                        setSearchValue(event.target.value);
                    }}
                />
            </div>
            <div className="search-filter-menu">
                <div className="search-filter-sort">
                    <label className="sort-label" htmlFor="sort-select">
                        Sort by:
                        <select
                            id="sort-select"
                            className="search-filter-select"
                            onChange={(event) => {
                                setSortFilter(event.target.value);
                            }}
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button
                        className="sort-button"
                        type="button"
                        onClick={() => {
                            setReverse(!reverse);
                        }}
                    >
                        <img
                            className="sort-icon"
                            alt="sort-icon"
                            src={sortIcon}
                        />
                    </button>
                </div>
                <div className="search-filter-device">
                    <label htmlFor="device-select">
                        Device:
                        <select
                            id="device-select"
                            className="search-filter-select"
                            onChange={(event) => {
                                setDevice(event.target.value);
                            }}
                        >
                            {deviceOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default SearchFilter;
