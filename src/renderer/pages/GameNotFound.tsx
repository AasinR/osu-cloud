import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import './GameNotFound.css';

function GameNotFound() {
    const [loading, setLoading] = useState<boolean>(true);
    const [valid, setValid] = useState<boolean>();
    const [path, setPath] = useState<string>();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setLoading(true);
            const validPath = await window.electron.checkGameFolder();
            if (validPath) navigate('/beatmaps');
            setLoading(false);
        })();
    }, [navigate]);

    const handleSelectFolder = async () => {
        const selectedPath = await window.electron.selectFolder();
        await window.electron.setSettings('GamePath', selectedPath);
        setPath(selectedPath);
        const validPath = await window.electron.checkGameFolder();
        setValid(validPath);
        if (validPath) navigate('/beatmaps');
    };

    const handleDownloadClick = () => {
        window.electron.openExternal('https://osu.ppy.sh/home/download');
    };

    const errorMessage = () => {
        if (!path) return '';
        if (valid === undefined) return `Checking path: ${path}`;
        if (valid) return 'Valid path';
        return `Invalid path: ${path}`;
    };

    if (loading) return <LoadingPage />;
    return (
        <div className="page">
            <div className="center-panel">
                <p id="not-found-title" className="not-found-item">
                    Unable to locate osu! folder
                </p>
                <p
                    className={`not-found-item information-${
                        valid ? 'valid' : 'invalid'
                    }`}
                >
                    {errorMessage()}
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
