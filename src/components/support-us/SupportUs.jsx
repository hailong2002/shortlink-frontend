import './SupportUs.css';
import qr from '../../assets/qr.jpg';

function SupportUs () {
    return (
        <div className="support-us p-4">
            <h1 className="text-lg font-bold mb-2">Support Us</h1>
            <p className="text-sm text-gray-600 mb-4">
                If you find this service useful, consider supporting us to help us maintain and improve it. <br/> Thank you ❤️❤️❤️
            </p>
            <img src={qr} alt="QR Code" className="w-full h-auto rounded-lg shadow-sm" />
        </div>
    );
}

export default SupportUs;