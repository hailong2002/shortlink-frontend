import { useState, useEffect } from 'react'
import './App.css'
import qrCode from './assets/qr.jpg'
import { getOriginalUrl, createShortLink, me } from './services/shortlink';
import TopNav from './components/topnav/Topnav';
import Footer from './components/footer/Footer';
import LoginModal from './components/login-modal/LoginModal';
import HistoryTable from './components/history-table/HistoryTable';
import Instruction from './components/instruction/instruction';

function App() {
  const [url, setUrl] = useState(''); // Lưu link gốc người dùng gõ
  const [result, setResult] = useState(''); // Lưu link rút gọn trả về
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // setResult({data: "https://google.com"});
    me()
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };


  const handleShorten = async () => {
    if (!url || !url.trim()) {
      alert("Please enter your url ! ");
      return;
    }

    if (!isValidUrl(url)) {
      alert("Your url is not valid ! ");
      return;
    }

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
      <TopNav onLoginClick={() => setIsOpen(true)} user={user}/>
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
            <p className='result'>🔥🔥🔥Your short link: <a className='shortedUrl' href={result.data} target="_blank" rel="noopener noreferrer">{result.data}</a>🔥🔥🔥</p>
          )}
          {/* <div className='qr-code'>
            <img src={qrCode} alt="QR Code" />
          </div> */}


        </div>

        {/* <div className='history'><HistoryTable /></div> */}
        {user ? <div className='history'><HistoryTable /></div> : <div className='instruction'><Instruction /></div>  }
    
       
      </div>

      <Footer />

    </>
  )
}

export default App
