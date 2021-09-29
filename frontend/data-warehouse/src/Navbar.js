import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import MenuIcon from '@material-ui/icons/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

function Navbar() {
    const [menuToggle, setMenuToggle] = useState(true);
    const mobileMatch = useMediaQuery('(max-width: 731px)');

    window.addEventListener("resize", () => {
        if (mobileMatch) {
            setMenuToggle(false);
        } else {
            setMenuToggle(true);
        }
    })

    const handleClick = (e) => {
        setMenuToggle(!menuToggle);
    }

    return (
        <nav className="nav">
            <div className="nav__left">
                <h1>LOGO</h1>
            </div>
            <div className="nav__right">
                {mobileMatch && (menuToggle == false ? <MenuIcon onClick={handleClick} /> : <MenuOpenIcon onClick={handleClick} />)}
                {menuToggle && (<ul  className="nav__ul fade_in">
                    <li className="nav__li first">Contactos</li>
                    <li className="nav__li">Compañías</li>
                    <li className="nav__li">Usuarios</li>
                    <li className="nav__li">Región / Ciudad</li>
                </ul>)}
            </div>
        </nav>
    )
}

export default Navbar
