import './Topnav.css';
import { useState, useEffect } from 'react';
import logo from '../../assets/main_logo.png';

function TopNav({ onLoginClick }) {

    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUsername(payload.sub);
        }
    }, []);


    return (
        <div className="topnav">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            {
                username ? (<div className="username">{username}</div>) : 
                <div className="login-btn">
                    <a onClick={onLoginClick}>Login</a>
                </div>
            }
        </div>
    );
}

export default TopNav;