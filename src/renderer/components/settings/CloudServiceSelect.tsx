import './CloudServiceSelect.css';

function CloudServiceSelect() {
    return (
        <div className="cloud-service-select">
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
                        />
                    </label>
                    <label htmlFor="Server">
                        Server
                        <input
                            id="Server"
                            type="radio"
                            name="service-type"
                            value="Server"
                        />
                    </label>
                </div>
            </div>
            <div className="cloud-service-settings">
                Select option goes here!
            </div>
            <div className="cloud-service-apply">
                <button type="button">Cancel Changes</button>
                <button type="button">Save Settings</button>
            </div>
        </div>
    );
}

export default CloudServiceSelect;
