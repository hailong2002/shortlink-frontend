import './Topnav.css';
import { useState, useEffect } from 'react';
import logo from '../../assets/main_logo.png';

function TopNav({ onLoginClick, user }) {

    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        console.log("logout...");
        setOpen(false);
        // clear token / call API logout ở đây
    };

    return (
        <div className="topnav">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            {
                // user ? (<div className="username">{user.name}</div>) : 
                // <div className="login-btn">
                //     <a onClick={onLoginClick}>Login</a>
                // </div>
                // <div className="username">hailong123456@gmail.com</div>
                <div className="relative" >
                    {/* Username */}
                    <div
                        className="cursor-pointer px-3 py-2 hover:bg-gray-100 rounded w-fit ml-auto"
                        onClick={() => setOpen(!open)}
                    >
                        NguyenHaiLong ▼
                    </div>

                    {/* Dropdown */}
                    {open && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                        </div>
                    )}
                </div>
            }
        </div>
    );
}

export default TopNav;