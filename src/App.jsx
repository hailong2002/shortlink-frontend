import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { getOriginalUrl, createShortLink } from './services/shortlink';

function App() {
  const [url, setUrl] = useState(''); // Lưu link gốc người dùng gõ
  const [result, setResult] = useState(''); // Lưu link rút gọn trả về

  const handleShorten = async () => {
    try {
      // Gọi hàm từ service của bạn, truyền cái inputUrl vào
      const response = await createShortLink({ originalUrl: url });

      // Giả sử API trả về data có field là shortCode hoặc shortUrl
      setResult(response.data);

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
      <div className="shortlink-box">
        <div className="ticks"></div>
        <input
          type="text"
          placeholder="Dán link vào đây..."
          onChange={setInputUrl}
        />
        <button
          className="counter"
          onClick={handleShorten}
        >Rút gọn</button>
        {result && (
          <p>Link rút gọn: <a href={result.data} target="_blank" rel="noopener noreferrer">{result.data}</a></p>
        )}
      </div>

    </>
  )
}

export default App
