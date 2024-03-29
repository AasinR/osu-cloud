import { useState } from 'react';
import { GoogleDriveInfo } from '../components/information';
import { SideNavigation } from '../components/utils';

function InformationPage() {
    const [selected, setSelected] = useState<number>(0);

    const selectOptions = [
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
            <SideNavigation
                selectOptions={selectOptions}
                onSelect={(value) => setSelected(value)}
            >
                {selectDisplay()}
            </SideNavigation>
        </div>
    );
}

export default InformationPage;
