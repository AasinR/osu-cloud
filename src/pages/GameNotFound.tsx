import './GameNotFound.css';

function GameNotFound() {
    const handleSelectFolder = async () => {
        const folderPath = await window.electron.selectFolder();
        console.log(folderPath);
    };

    const handleDownloadClick = () => {
        window.electron.openExternal('https://osu.ppy.sh/home/download');
    };

    return (
        <div className="page">
            <div className="center-panel">
                <p id="not-found-title" className="not-found-item">
                    Unable to locate osu! folder
                </p>
                <button
                    className="not-found-item not-found-button"
                    type="button"
                    onClick={handleSelectFolder}
                >
                    Set folder path manually
                </button>
                <button
                    className="not-found-item not-found-button"
                    type="button"
                    onClick={handleDownloadClick}
                >
                    Download osu!
                </button>
            </div>
        </div>
    );
}

export default GameNotFound;
