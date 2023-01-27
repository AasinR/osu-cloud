import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import { PopupWindow } from '../components/utils';
import { GoogleDriveInfo } from '../components/information';
import './CloudSelect.css';

function CloudSelect() {
    const [loading, setLoading] = useState<boolean>(true);
    const [selected, setSelected] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>('');
    const [valid, setValid] = useState<boolean>(true);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setLoading(true);
            const settingsData = await window.electron.getSettings();
            if (settingsData.CloudServiceType) navigate('/beatmaps');
            setLoading(false);
        })();
    }, [navigate]);

    const handleSelectFile = async () => {
        setValid(true);
        const selectedPath = await window.electron.showDialog('openFile');
        setInputValue(selectedPath);
    };

    const handleSelectDrive = async () => {
        setLoading(true);
        const validFile = await window.electron.selectGoogleDrive(inputValue);
        setValid(validFile);
        setLoading(false);
        if (validFile) navigate('/beatmaps');
    };

    const handleBack = () => {
        setSelected(0);
        setInputValue('');
        setValid(true);
    };

    const handlePopup = () => {
        setShowPopup(false);
    };

    // select buttons
    const SelectMenu = (
        <div>
            <button
                className="cloud-select-item cloud-select-button"
                type="button"
                onClick={() => setSelected(1)}
            >
                Use Google Drive
            </button>
            <button
                className="cloud-select-item cloud-select-button"
                type="button"
                onClick={() => setSelected(2)}
            >
                Use Personal Server
            </button>
        </div>
    );

    // select google service account
    const GoogleSelect = (
        <div>
            {!valid ? (
                <p className="cloud-select-error-message">
                    {inputValue
                        ? 'Invalid credentials file'
                        : 'Missing credentials file'}
                </p>
            ) : (
                ''
            )}
            <div className="cloud-select-item cloud-select-file">
                <input
                    className="cloud-select-file-text"
                    placeholder="Service account credentials file"
                    spellCheck={false}
                    value={inputValue}
                    disabled
                />
                <button
                    className="cloud-select-button cloud-select-file-button"
                    type="button"
                    onClick={handleSelectFile}
                >
                    Select File
                </button>
            </div>
            <div className="cloud-select-item cloud-select-2element">
                <button
                    className="cloud-select-button cloud-select-button-small"
                    type="button"
                    onClick={handleBack}
                >
                    Back
                </button>
                <button
                    className="cloud-select-button cloud-select-button-small"
                    type="button"
                    onClick={handleSelectDrive}
                >
                    Done
                </button>
            </div>
            <button
                type="button"
                className="cloud-select-info information-external-link"
                onClick={() => setShowPopup(true)}
            >
                What&apos;s a service account?
            </button>
        </div>
    );

    // select personal server api
    const ServerSelect = (
        <div>
            <input
                className="cloud-select-item cloud-select-api-input"
                placeholder="Server api url"
                spellCheck={false}
            />
            <div className="cloud-select-item cloud-select-2element">
                <button
                    className="cloud-select-button cloud-select-button-small"
                    type="button"
                    onClick={handleBack}
                >
                    Back
                </button>
                <button
                    className="cloud-select-button cloud-select-button-small"
                    type="button"
                >
                    Done
                </button>
            </div>
            <button
                type="button"
                className="cloud-select-info information-external-link"
                onClick={() => setShowPopup(true)}
            >
                Information about the API
            </button>
        </div>
    );

    const pageTitle = () => {
        if (selected === 0) return 'Select cloud service';
        if (selected === 1) return 'Use Google Drive';
        return 'Use Personal Server';
    };

    const selectDisplay = () => {
        if (selected === 0) return SelectMenu;
        if (selected === 1) return GoogleSelect;
        return ServerSelect;
    };

    const displayPopup = () => {
        if (selected === 1)
            return (
                <PopupWindow onClose={handlePopup}>
                    <GoogleDriveInfo />
                </PopupWindow>
            );
        if (selected === 2)
            return (
                <PopupWindow onClose={handlePopup}>
                    <p>Sample Text</p>
                </PopupWindow>
            );
        return null;
    };

    if (loading) return <LoadingPage />;
    return (
        <div className="page">
            {showPopup ? displayPopup() : null}
            <div className="cloud-center-panel">
                <div className="cloud-select-title">
                    <p className="cloud-select-title-text">{pageTitle()}</p>
                    <p className="cloud-select-note">
                        (Note: you can change this later)
                    </p>
                </div>
                {selectDisplay()}
            </div>
        </div>
    );
}

export default CloudSelect;
