import './GoogleDriveInfo.css';

function GoogleDriveInfo() {
    return (
        <div className="information-component">
            <h1>Google Drive Service Account</h1>
            <h2>What is a Service Account?</h2>
            <p>
                A service account is a special kind of account used by an
                application or compute workload, such as a Compute Engine
                virtual machine (VM) instance, rather than a person. A service
                account is identified by its email address, which is unique to
                the account.
            </p>
            <p>
                Service accounts allow you to perform server to server,
                app-level authentication using a robot account. You will create
                a service account, download a keyfile, and use that to
                authenticate to Google APIs.{' '}
                <button
                    className="information-external-link"
                    type="button"
                    onClick={() => {
                        window.electron.openExternal(
                            'https://cloud.google.com/iam/docs/service-accounts'
                        );
                    }}
                >
                    Learn more.
                </button>
            </p>
            <h2>How to set up a Service Account?</h2>
            <p>
                You can create a service account at the{' '}
                <button
                    className="information-external-link"
                    type="button"
                    onClick={() => {
                        window.electron.openExternal(
                            'https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts?supportedpurview=project'
                        );
                    }}
                >
                    Service accounts
                </button>{' '}
                page:
            </p>
            <ul>
                <li>
                    First you have to select a project that will contain your
                    service account. <br />
                    You can create one by clicking on the <b>
                        CREATE PROJECT
                    </b>{' '}
                    button.
                </li>
                <li>
                    Click on the <b>CREATE SERVICE ACCOUNT</b> button.
                </li>
                <li>
                    Grant <b>Editor role</b> to the service account.
                </li>
                <li>
                    Enable the{' '}
                    <button
                        className="information-external-link"
                        type="button"
                        onClick={() => {
                            window.electron.openExternal(
                                'https://console.cloud.google.com/apis/library/drive.googleapis.com'
                            );
                        }}
                    >
                        Google Drive API
                    </button>{' '}
                    for the project.
                </li>
            </ul>
            <p>To get a service account credentials key file, you have to:</p>
            <ul>
                <li>
                    Select the created account and go into the <b>KEYS</b> page
                </li>
                <li>
                    Click on the <b>ADD KEY</b> button, and select the Create
                    new key option.
                </li>
                <li>
                    Set the key type to JSON, then create it. This should
                    download the key file.
                </li>
            </ul>
            <p>
                The key file can only be downloaded once, when the key is
                created. To get access to the service account on an other
                device, you either share the key file or create a new key.
            </p>
        </div>
    );
}

export default GoogleDriveInfo;
