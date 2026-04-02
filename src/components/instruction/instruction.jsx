import './instruction.css';
import { FiCopy } from "react-icons/fi";
import { FiLink } from "react-icons/fi";
import { FiShare2 } from "react-icons/fi";



function Instruction() {
    return (
     <div className="instruction-container">
            <h2>How it works</h2>
            <div className="steps">
                <div className="step">
                    <div className="circle-icon">
                        <FiCopy size={30} />
                    </div>
                    <div className="step-content">
                        <h4>1. Parse</h4>
                        <p>Paste your long url in the box.</p>
                    </div>
                </div>
                <div className="step">
                    <div className="circle-icon">
                        <FiLink size={30} />
                    </div>
                    <div className="step-content">
                        <h4>2. Shorten</h4>
                        <p>Click Shorten to get your short url.</p>
                    </div>
                </div>
                <div className="step">
                    <div className="circle-icon">
                        <FiShare2 size={30} />
                    </div>
                    <div className="step-content">
                        <h4>3. Share</h4>
                        <p>Share your short url with your friends.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Instruction;