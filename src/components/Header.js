import React, { Component } from 'react';
import ResetButton from './ResetButton';
import '../styles/header.css';
import jeffco from '../images/jeffco.png';

class Header extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="header">
                <span className="header-span">
                    <img src={jeffco} style={{height: 35 + 'px'}}/>
                    <h3 className="header-title">Jefferson County Workforce Job Search</h3>
                    <ResetButton />
                </span>
            </div>
        )
    }
}

export default Header;