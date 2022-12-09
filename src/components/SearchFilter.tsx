import './SearchFilter.css';

function SearchFilter({ devices }: { devices: Device[] }) {
  const sortOptions = [
    { name: 'Artist', value: 'Artist' },
    { name: 'Creator', value: 'Creator' },
    { name: 'Title', value: 'Title' },
  ];

  return (
    <div className="search-filter">
      <div className="search-bar">
        <input
          className="search-bar-input"
          type="text"
          placeholder="Search..."
          spellCheck={false}
        />
      </div>
      <div className="search-filter-menu">
        <div className="search-filter-sort">
          <label htmlFor="sort-select">
            Sort by:
            <select id="sort-select" className="search-filter-select">
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="sort-order">
            Reverse:
            <input
              id="sort-order"
              className="search-filter-checkbox"
              type="checkbox"
            />
          </label>
        </div>
        <div className="search-filter-device">
          <label htmlFor="device-select">
            Device:
            <select id="device-select" className="search-filter-select">
              <option key={1} value={1}>
                All
              </option>
              {devices.map((option) => (
                <option key={option.uuid} value={option.uuid}>
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
