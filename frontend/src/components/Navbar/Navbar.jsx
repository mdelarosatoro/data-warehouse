import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import './nav-link.css';
import { UserContext } from '../Usuarios/UserContext';

const Nav = styled.nav`
    background-color: #1D72C2;
    padding: 22px 0px 22px 30px;
    position: sticky;
    top: 0;
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NavTitle = styled.h2`
    display: block;
    color: white;
`;

const NavUl = styled.ul`
    display: flex;
`;

const NavLi = styled.li`
    list-style: none;
    color: white;
    margin-right: 20px;
    margin-left: 20px;
    padding: 20px;
`;

const activeStyle = { borderBottom: '3px solid white' }

function Navbar(props) {
    const [userData] = useContext(UserContext);

    return (
        <Nav>
            <NavLink to="/">
                <NavTitle>LOGO</NavTitle>
            </NavLink>
            {userData &&
            <NavUl>
                <NavLink className='nav-link' to="/contactos" activeStyle={activeStyle}>
                    <NavLi>Contactos</NavLi>
                </NavLink>
                <NavLink className='nav-link' to="/empresas" activeStyle={activeStyle}> 
                    <NavLi>Empresas</NavLi>
                </NavLink>
                <NavLink className='nav-link' to="/regiones" activeStyle={activeStyle}>
                    <NavLi>Ciudad / Región</NavLi>
                </NavLink>
                <NavLink className='nav-link' to="/usuarios" activeStyle={activeStyle}> 
                    <NavLi>Usuarios</NavLi>
                </NavLink>
            </ NavUl>}
        </Nav>
    )
}

export default Navbar
