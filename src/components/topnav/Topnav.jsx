import './Topnav.css';
import { useState, useEffect, useRef } from 'react';
import logo from '../../assets/main_logo.png';
import { logout } from '../../services/shortlink';
import SupportUs from '../support-us/SupportUs';
import ThemeToggle from '../theme-toggle/ThemeToggle';

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
                <ThemeToggle />
                <div className="relative" ref={qrRef}>
                    <div
                        className="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-700 dark:text-gray-200 transition-colors w-fit ml-auto"
                        onClick={() => setOpenQr(!openQr)}
                    >
                        Donate
                    </div>
                    {openQr && (
                        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50 text-gray-800 dark:text-gray-100">
                            <SupportUs />
                        </div>
                    )}
                </div>
                {
                    user ? (
                        <div className="relative" ref={menuRef}>
                            <div
                                className="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-700 dark:text-gray-200 transition-colors w-fit ml-auto"
                                onClick={() => setOpen(!open)}
                            >
                                {user.name} {open ? '⮝' : '⮟'}
                            </div>

                            {open && (
                                <div className="absolute right-0 mt-2 mr-1 w-44 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden text-gray-800 dark:text-gray-100 z-50">
                                    <div className='p-3 border-b border-gray-100 dark:border-gray-700/60 text-sm'>
                                        👋 Hi <span className="font-semibold">{user.name}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="cursor-pointer px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-700 dark:text-gray-200 transition-colors w-fit ml-auto">
                            <a onClick={onLoginClick}>Login</a>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default TopNav;