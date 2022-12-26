import { useEffect, useState } from 'react';
import { sortMaps } from 'utils/data';
import './SearchFilter.css';
import sortIcon from '../../assets/icons/sort-icon.png'; // https://icons8.com/icons/set/sort-order put it into about section!!!!!

interface SortOption {
    name: string;
    value: 'Title' | 'Artist' | 'Creator';
}

function SearchFilter({
    devices,
    searchList,
    onSearch,
}: {
    devices: Device[];
    searchList: Beatmap[];
    onSearch: (result: Beatmap[]) => void;
}) {
    const sortOptions: SortOption[] = [
        { name: 'Title', value: 'Title' },
        { name: 'Artist', value: 'Artist' },
        { name: 'Creator', value: 'Creator' },
    ];

    const deviceOptions = [
        { name: 'All', value: '1' },
        ...devices.map((option) => ({ name: option.name, value: option.uuid })),
    ];

    const [searchValue, setSearchValue] = useState<string>('');
    const [sortFilter, setSortFilter] = useState<
        'Title' | 'Artist' | 'Creator'
    >(sortOptions[0].value);
    const [reverse, setReverse] = useState<boolean>(false);
    const [device, setDevice] = useState<string>(deviceOptions[0].value);

    // search runs when a value changes
    useEffect(() => {
        const searchWord = searchValue.toLowerCase();
        const result: Beatmap[] = searchList.filter((value: Beatmap) => {
            return (
                (device === '1' || value.downloaded.includes(device)) &&
                (value.metadata.Title.toLowerCase().includes(searchWord) ||
                    value.metadata.Artist.toLowerCase().includes(searchWord) ||
                    value.metadata.Creator.toLowerCase().includes(searchWord))
            );
        });
        sortMaps(result, sortFilter, reverse);
        onSearch(result);
    }, [reverse, searchValue, sortFilter, onSearch, searchList, device]);

    return (
        <div className="search-filter">
            <div id="search-bar" className="search-row">
                <input
                    type="text"
                    placeholder="Search..."
                    spellCheck={false}
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                />
            </div>
            <div id="search-menu" className="search-row">
                <div className="search-menu-sort">
                    <label className="search-menu-label" htmlFor="sort-select">
                        Sort by:
                        <select
                            id="sort-select"
                            className="search-filter-select"
                            onChange={(event) =>
                                setSortFilter(
                                    event.target.value as SortOption['value']
                                )
                            }
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
                        onClick={() => setReverse(!reverse)}
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
                            onChange={(event) => setDevice(event.target.value)}
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
