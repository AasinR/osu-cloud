import { Link } from 'react-router-dom';
import { useState } from 'react';
import hamburgerIcon from '../../../assets/icons/hamburger-menu.png';
import './Navbar.css';

function Navbar() {
    const dropdown = [{ title: 'Beatmaps', src: '/beatmaps' }];

    const [active, setActive] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>(dropdown[0].title);

    return (
        <nav className="navbar">
            <div className="nav-menu">
                <div className="nav-dropdown-select">
                    <button
                        type="button"
                        onClick={() => setActive(!active)}
                        onBlur={(event) => {
                            if (
                                !event.relatedTarget?.classList.contains(
                                    'nav-dropdown-link'
                                )
                            ) {
                                setActive(false);
                            }
                        }}
                    >
                        <img alt="-" src={hamburgerIcon} />
                    </button>
                    <p>{selected}</p>
                </div>
                <ul>
                    <li>
                        <Link className="nav-menu-link" to="/beatmaps">
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-menu-link" to="/information">
                            Information
                        </Link>
                    </li>
                </ul>
            </div>
            {active ? (
                <div className="nav-dropdown">
                    {dropdown.map((page) => (
                        <Link
                            className="nav-dropdown-link"
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
        </nav>
    );
}

export default Navbar;
