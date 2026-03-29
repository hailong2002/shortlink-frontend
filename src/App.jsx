import { useState, useEffect } from 'react'
import './App.css'
import { getOriginalUrl, createShortLink, me } from './services/shortlink';
import TopNav from './components/topnav/Topnav';
import Footer from './components/footer/Footer';
import LoginModal from './components/login_modal/Login_Modal';
import axiosClient from './infrastructure/axiosClient';

function App() {
  const [url, setUrl] = useState(''); // Lưu link gốc người dùng gõ
  const [result, setResult] = useState(''); // Lưu link rút gọn trả về
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    me()
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const handleShorten = async () => {
    if (!user) {
      setIsOpen(true);
      return;
    }
    try {
      setLoading(true);
      const response = await createShortLink({ originalUrl: url });
      setResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi rồi:", error);
      setLoading(false);
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
      <div className='shortlink-container'>
        <div className='top-row'>
          <p className='title'>Make your link shorter</p>
          <div className="shortlink-box">
            {/* <div className="ticks"></div> */}
            <input
              type="text"
              placeholder="Enter your URL..."
              onChange={setInputUrl}
            />
            {!loading && <button
              className="counter"
              onClick={handleShorten}
            >Shorten</button>
            }
          </div>
          {loading && <div className="spinner"></div>}
          {result && (
            <p className='result'>Short link: <a className='shortedUrl' href={result.data} target="_blank" rel="noopener noreferrer">{result.data}</a></p>
          )}


        </div>


        <div className='history'>

        </div>
      </div>
      <Footer />

    </>
  )
}

export default App
