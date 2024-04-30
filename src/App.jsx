import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');
  

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const urlPattern = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      '(\\#[-a-z\\d_]*)?$','i');
    if (!urlPattern.test(url)) {
      setError('Некоректна URL-адреса');
      return;
    }

    try {
      const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
      const response = await axios.post(`${CORS_PROXY}https://cleanuri.com/api/v1/shorten`, { url });
      setShortenedUrl(response.data.result_url);
      setError('');
    } catch (error) {
      console.error('Помилка під час скорочення URL:', error);
      setError('Помилка під час скорочення URL');
    }
  };

  return (

    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className='font-mono text-5xl mb-6'>Скорочувач URL</h1>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={url}
          onChange={handleChange}
          placeholder="Введіть URL адресу"
          className='border-2 border-gray-400 rounded-l py-2 px-4 mr-3 rounded-lg border-solid'
        />
        <button
          type="submit"
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
        >
          Скоротити
        </button>
      </form>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
      {shortenedUrl && (
        <div className='mt-4'>
          <p>Скорочена URL:</p>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className='text-blue-600'>
            {shortenedUrl}
          </a>
        </div>
      )}
  </div>

  );
};

export default App;