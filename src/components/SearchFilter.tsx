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
        <input className="search-bar-input" type="text" />
      </div>
      <div className="search-filter-sort">
        Sort by:
        <select className="search-filter-select">
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="search-filter-device">
        Device:
        <select className="search-filter-select">
          <option key={1} value={1}>
            All
          </option>
          {devices.map((option) => (
            <option key={option.uuid} value={option.uuid}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchFilter;
