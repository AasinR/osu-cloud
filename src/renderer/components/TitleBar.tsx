import { Link } from 'react-router-dom';
import { useState } from 'react';
import HamburgerIcon from '../../../assets/icons/hamburger-menu.png';
import './TitleBar.css';

function TitleBar() {
    const dropdown = [
        { title: 'Beatmaps', src: '/beatmaps' },
        { title: 'Settings', src: '/settings' },
        { title: 'About', src: '/about' },
    ];

    const [active, setActive] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>(dropdown[0].title);

    return (
        <div className="title-bar">
            <div className="title-bar-select">
                <button
                    className="title-bar-menu-button"
                    type="button"
                    onClick={() => setActive(!active)}
                    onBlur={(event) => {
                        if (
                            !event.relatedTarget?.classList.contains(
                                'title-bar-dropdown-link'
                            )
                        ) {
                            setActive(false);
                        }
                    }}
                >
                    <img alt="-" src={HamburgerIcon} />
                </button>
                {active ? (
                    <div className="title-bar-dropdown">
                        {dropdown.map((page) => (
                            <Link
                                className="title-bar-dropdown-link"
                                key={page.title}
                                to={page.src}
                                onClick={() => {
                                    setSelected(page.title);
                                    setActive(false);
                                }}
                            >
                                {page.title}
                            </Link>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="title-bar-drag">
                <p>{selected}</p>
            </div>
            <div className="title-bar-control">
                <button
                    className="title-bar-control-button title-bar-close"
                    type="button"
                    onClick={() => window.electron.controls.close()}
                >
                    &#x2715;
                </button>
                <button
                    className="title-bar-control-button"
                    type="button"
                    onClick={() => window.electron.controls.maximize()}
                >
                    &#9744;
                </button>
                <button
                    className="title-bar-control-button"
                    type="button"
                    onClick={() => window.electron.controls.minimize()}
                >
                    &#8213;
                </button>
            </div>
        </div>
    );
}

export default TitleBar;
