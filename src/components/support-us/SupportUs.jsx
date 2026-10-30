import './SupportUs.css';
import qr from '../../assets/qr.jpg';

function SupportUs () {
    return (
        <div className="support-us p-4 bg-white dark:bg-[#161b22] text-left">
            <h1 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Support Us</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                If you find this service useful, consider supporting us to help us maintain and improve it. <br/> Thank you ❤️❤️❤️
            </p>
            <img src={qr} alt="QR Code" className="w-full h-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-700" />
        </div>
    );
}

export default SupportUs;