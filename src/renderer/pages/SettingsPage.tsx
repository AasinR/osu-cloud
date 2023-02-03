import { useState } from 'react';
import { CloudServiceSelect } from '../components/settings';
import { SideNavigation } from '../components/utils';

function SettingsPage() {
    const [selected, setSelected] = useState<number>(0);

    const selectOptions = [
        {
            title: 'Application',
            options: [
                { name: 'Launch Options', value: 0 },
                { name: 'Cloud Service', value: 1 },
            ],
        },
        {
            title: 'Save Data',
            options: [
                { name: 'Save File', value: 2 },
                { name: 'Modify Data', value: 3 },
            ],
        },
    ];

    const SampleText = <p>Sample Text</p>;

    const selectDisplay = () => {
        switch (selected) {
            case 1:
                return <CloudServiceSelect />;
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

export default SettingsPage;
