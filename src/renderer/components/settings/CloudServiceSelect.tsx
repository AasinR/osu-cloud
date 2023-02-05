import { ChangeEvent, useEffect, useState } from 'react';
import { PopupWindow } from '../utils';
import { GoogleDriveInfo } from '../information';
import './CloudServiceSelect.css';

function CloudServiceSelect() {
    const [selected, setSelected] = useState<string>('GoogleDrive');
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [credentials, setCredentials] = useState<CredentialsData | null>();

    useEffect(() => {
        (async () => {
            const credData = await window.electron.cloud.getCredentials();
            if (credData) setCredentials(credData);
        })();
    }, []);

    const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelected(event.target.value);
    };

    const handlePopup = () => setShowPopup(false);

    const handleFileSelect = async () => {
        const selectedPath = await window.electron.showDialog('openFile');
        setInputValue(selectedPath);
        const credData = await window.electron.cloud.getCredentials(
            selectedPath
        );
        setCredentials(credData);
    };

    const displayPopup = () => {
        switch (selected) {
            case 'GoogleDrive':
                return <GoogleDriveInfo />;
            case 'Server':
                return null;
            default:
                return null;
        }
    };

    return (
        <div className="cloud-service-select">
            {showPopup ? (
                <PopupWindow onClose={handlePopup}>
                    {displayPopup()}
                </PopupWindow>
            ) : null}
            <div className="cloud-service-type">
                <p>Cloud Service type:</p>
                <div>
                    <label htmlFor="GoogleDrive">
                        Google Drive
                        <input
                            id="GoogleDrive"
                            type="radio"
                            name="service-type"
                            value="GoogleDrive"
                            defaultChecked
                            onChange={handleTypeChange}
                        />
                    </label>
                    <label htmlFor="Server">
                        Server
                        <input
                            id="Server"
                            type="radio"
                            name="service-type"
                            value="Server"
                            onChange={handleTypeChange}
                        />
                    </label>
                </div>
            </div>
            {selected === 'GoogleDrive' ? (
                <div className="cloud-service-settings">
                    <div className="cloud-service-credentials-data">
                        <p>
                            Project ID:{' '}
                            <span
                                className={`cloud-service-message-${
                                    credentials ? 'valid' : 'invalid'
                                }`}
                            >
                                {credentials
                                    ? credentials.project_id
                                    : 'Invalid credentials file!'}
                            </span>
                        </p>
                        <p>
                            Service account ID:{' '}
                            <span
                                className={`cloud-service-message-${
                                    credentials ? 'valid' : 'invalid'
                                }`}
                            >
                                {credentials
                                    ? credentials.private_key_id
                                    : 'Invalid credentials file!'}
                            </span>
                        </p>
                    </div>
                    <div className="cloud-service-file-select">
                        <input
                            className="cloud-service-input"
                            placeholder="Service account credentials file"
                            spellCheck={false}
                            value={inputValue}
                            disabled
                        />
                        <button
                            type="button"
                            className="cloud-service-button"
                            onClick={handleFileSelect}
                        >
                            Select File
                        </button>
                    </div>
                    <button
                        type="button"
                        className="information-external-link"
                        onClick={() => setShowPopup(true)}
                    >
                        What is a service account?
                    </button>
                </div>
            ) : (
                <div className="cloud-service-settings">Coming not so soon</div>
            )}
            <div className="cloud-service-apply">
                <button type="button" className="cloud-service-button">
                    Cancel Changes
                </button>
                <button type="button" className="cloud-service-button">
                    Save Settings
                </button>
            </div>
        </div>
    );
}

export default CloudServiceSelect;
