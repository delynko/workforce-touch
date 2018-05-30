import React from 'react';
import '../styles/header.css';
import jeffco from '../images/jeffco.png';

const Header = () => (
    <div className="header">
        <span className="header-span">
            <img src={jeffco} style={{height: 35 + 'px'}} alt="Jeffco Logo"/>
            <h3 className="header-title">Jefferson County Workforce Job Search</h3>
        </span>
    </div>
);

export default Header;