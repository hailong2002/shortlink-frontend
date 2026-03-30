import './LoginModal.css';

function LoginModal({ onClose }) {

    const handleLogin = () => {
        window.location.href = "https://shortlink.io.vn/oauth2/authorization/google";
    };

    return (
    <>
            <div className="overlay" onClick={onClose}>
                <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                <p className="login-text">Login now to get started</p>
                    <button className="login-button" onClick={handleLogin}>Login with Google</button>
            </div>
        </div>  
    </>
    )
}

export default LoginModal;