import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TokenizeExample from './TokenizeExample';

const path = window.location.pathname;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {path === '/tokenize' ? <TokenizeExample /> : <App />}
  </React.StrictMode>,
);
