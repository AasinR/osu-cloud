import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import HamburgerIcon from '../../../assets/icons/hamburger-menu.png';
import './TitleBar.css';

function TitleBar() {
    const [active, setActive] = useState<boolean>(false);
    const location = useLocation();

    const dropdown = [
        { title: 'Beatmaps', url: '/beatmaps' },
        { title: 'Settings', url: '/settings' },
        { title: 'About', url: '/about' },
    ];

    function checkUrl() {
        return (
            dropdown.find((item) => item.url === location.pathname)?.title ??
            'osu!Cloud'
        );
    }

    return (
        <div className="title-bar">
            {checkUrl() !== 'osu!Cloud' ? (
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
                                    to={page.url}
                                    onClick={() => {
                                        setActive(false);
                                    }}
                                >
                                    {page.title}
                                </Link>
                            ))}
                        </div>
                    ) : null}
                </div>
            ) : null}
            <div className="title-bar-drag">
                <p>{checkUrl()}</p>
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
