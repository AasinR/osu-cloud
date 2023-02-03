import { useEffect, useState } from 'react';
import './SideNavigation.css';

function SideNavigation({
    className,
    children,
    selectOptions,
    onSelect,
}: {
    className?: string;
    children: JSX.Element;
    selectOptions: {
        title: string;
        options: {
            name: string;
            value: number;
        }[];
    }[];
    onSelect: (selected: number) => void;
}) {
    const [selected, setSelected] = useState<number>(
        selectOptions[0].options[0].value
    );

    useEffect(() => {
        onSelect(selected);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    return (
        <div className={`side-navigation-container ${className}`}>
            <div className="side-navigation">
                {selectOptions.map((group) => (
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
            <div className="side-navigation-content-area">{children}</div>
        </div>
    );
}

SideNavigation.defaultProps = {
    className: '',
};

export default SideNavigation;
