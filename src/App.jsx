import { useState, useEffect } from 'react'
import './App.css'
import { getOriginalUrl, createShortLink } from './services/shortlink';
import TopNav from './components/topnav/Topnav';
import Footer from './components/footer/Footer';
import LoginModal from './components/login_modal/Login_Modal';

function App() {
  const [url, setUrl] = useState(''); // Lưu link gốc người dùng gõ
  const [result, setResult] = useState(''); // Lưu link rút gọn trả về
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleShorten = async () => {
    try {
      setLoading(true);
      const response = await createShortLink({ originalUrl: url });
      setResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi rồi:", error);
      alert("Hỏng rồi, check lại Server hoặc CORS đi!");
    }
  };

  const setInputUrl = (e) => {
    setUrl(e.target.value);
  };


  return (
    <>
      <TopNav onLoginClick={() => setIsOpen(true)} />
      {isOpen && (
        <LoginModal onClose={() => setIsOpen(false)} />
      )}
      <div className="shortlink-box">
        {/* <div className="ticks"></div> */}
        <input
          type="text"
          placeholder="Enter your URL..."
          style={{ fontFamily: "var(--mono)" }}
          onChange={setInputUrl}
        />
        {!loading && <button
          className="counter"
          onClick={handleShorten}
        >Shorten</button>
        }

        {loading && <div className="spinner"></div>}
        {result && (
          <p>Short link: <a href={result.data} target="_blank" rel="noopener noreferrer">{result.data}</a></p>
        )}
      </div>
      <Footer />

    </>
  )
}

export default App
