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
            const savedType = (await window.electron.settings.get())
                .CloudServiceType;
            if (savedType) setSelected(savedType);
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

    const handleSave = async () => {
        if (credentials && inputValue) {
            await window.electron.cloud.saveService(selected, inputValue);
            setInputValue('');
        }
    };

    const handleCancel = async () => {
        const savedType = (await window.electron.settings.get())
            .CloudServiceType;
        if (savedType) setSelected(savedType);
        const credData = await window.electron.cloud.getCredentials();
        if (credData) setCredentials(credData);
        setInputValue('');
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
                </div>
            </div>
            {selected === 'GoogleDrive' ? (
                <div className="cloud-service-settings">
                    <div className="cloud-service-credentials-data">
                        <p>
                            Project ID:{' '}
                            <span
                                className={
                                    inputValue
                                        ? `cloud-service-message-${
                                              credentials ? 'valid' : 'invalid'
                                          }`
                                        : ''
                                }
                            >
                                {/* eslint-disable-next-line no-nested-ternary */}
                                {credentials
                                    ? credentials.project_id
                                    : inputValue
                                    ? 'Invalid credentials file!'
                                    : ''}
                            </span>
                        </p>
                        <p>
                            Service account ID:{' '}
                            <span
                                className={
                                    inputValue
                                        ? `cloud-service-message-${
                                              credentials ? 'valid' : 'invalid'
                                          }`
                                        : ''
                                }
                            >
                                {/* eslint-disable-next-line no-nested-ternary */}
                                {credentials
                                    ? credentials.private_key_id
                                    : inputValue
                                    ? 'Invalid credentials file!'
                                    : ''}
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
            ) : null}
            <div className="cloud-service-apply">
                <button
                    type="button"
                    className="cloud-service-button"
                    onClick={handleCancel}
                >
                    Cancel Changes
                </button>
                <button
                    type="button"
                    className="cloud-service-button"
                    onClick={handleSave}
                >
                    Save Settings
                </button>
            </div>
        </div>
    );
}

export default CloudServiceSelect;
