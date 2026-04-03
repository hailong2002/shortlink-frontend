import './Topnav.css';
import { useState, useEffect, useRef } from 'react';
import logo from '../../assets/main_logo.png';
import { logout } from '../../services/shortlink';

function TopNav({ onLoginClick, user }) {

    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleLogout = async () => {
        console.log("logout...");
        setOpen(false);
        await logout();
        window.location.reload();
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
                user ? (
                <div className="relative" ref={menuRef}>
                    <div
                        className="cursor-pointer px-3 py-4 hover:bg-gray-100 rounded w-fit ml-auto"
                        onClick={() => setOpen(!open)}
                    >
                            {user.name} {open ? '⮝' : '⮟'}
                    </div>

                    {open && (
                        <div className="absolute right-0 mt-1 mr-1 w-40 bg-white border rounded-xl shadow-lg overflow-hidden">
                            <div className='p-2'>👋 Hi {user.name}, <br /></div>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 hover:bg-gray-300"
                        >
                            Logout
                        </button>
                        </div>
                    )}
                </div>
                ) : (
                    <div className="login-btn">
                        <a onClick={onLoginClick}>Login</a>
                    </div>
                )}
        </div>
    );
}

export default TopNav;