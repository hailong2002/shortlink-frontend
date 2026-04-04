import './Topnav.css';
import { useState, useEffect, useRef } from 'react';
import logo from '../../assets/main_logo.png';
import { logout } from '../../services/shortlink';
import SupportUs from '../support-us/SupportUs';

function TopNav({ onLoginClick, user }) {

    const [openQr, setOpenQr] = useState(false);
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const qrRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
            if (qrRef.current && !qrRef.current.contains(event.target)) {
                setOpenQr(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        if (openQr) {
            document.addEventListener('mousedown', handleClickOutside);
        }   

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, openQr]);

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
            <div className="right-topnav">
                <div className="relative" ref={qrRef}>
                    <div
                        className="cursor-pointer px-3 py-4 hover:bg-gray-100 rounded w-fit ml-auto"
                        onClick={() => setOpenQr(!openQr)}
                    >
                        Donate
                    </div>
                    {openQr && (
                        <div className="absolute right-0 mt-1 w-64 bg-white border rounded-xl shadow-2xl overflow-hidden z-50">
                            <SupportUs />
                        </div>
                    )}
                </div>
                {
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
                            <div className="cursor-pointer px-3 py-4 hover:bg-gray-100 rounded w-fit ml-auto">
                            <a onClick={onLoginClick}>Login</a>
                        </div>
                    )}
            </div>
          
        </div>
    );
}

export default TopNav;