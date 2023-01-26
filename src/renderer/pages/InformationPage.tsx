import { useState } from 'react';
import { GoogleDriveInfo } from '../components/information';
import './InformationPage.css';

function InformationPage() {
    const [selected, setSelected] = useState<number>(0);

    const infoSelect = [
        {
            title: 'Cloud services',
            options: [
                { name: 'Google Drive Service Account', value: 0 },
                { name: 'Personal Server API', value: 1 },
            ],
        },
    ];

    const SampleText = <p>Sample Text</p>;

    const selectDisplay = () => {
        switch (selected) {
            case 0:
                return <GoogleDriveInfo />;
            default:
                return SampleText;
        }
    };

    return (
        <div className="page">
            <div className="side-navigation">
                {infoSelect.map((group) => (
                    <div key={group.title} className="side-navigation-group">
                        <h1>{group.title}</h1>
                        {group.options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                className={
                                    option.value === selected
                                        ? 'side-navigation-selected'
                                        : 'side-navigation-unselected'
                                }
                                onClick={() => setSelected(option.value)}
                            >
                                {option.name}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
            <div className="information-area">{selectDisplay()}</div>
        </div>
    );
}

export default InformationPage;
