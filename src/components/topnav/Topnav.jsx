import './Topnav.css';
import { useState, useEffect } from 'react';
import logo from '../../assets/main_logo.png';

function TopNav({ onLoginClick, user }) {

    return (
        <div className="topnav">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            {
                user.email ? (<div className="username">{user.email}</div>) : 
                <div className="login-btn">
                    <a onClick={onLoginClick}>Login</a>
                </div>
            }
        </div>
    );
}

export default TopNav;