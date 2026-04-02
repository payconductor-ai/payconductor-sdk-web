import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TokenizerExample from './TokenizerExample';
import { TokenizerDirectExample } from './TokenizerDirectExample';
import { ThreeDSExample } from './ThreeDSExample';

const path = window.location.pathname;

function Route() {
  if (path === '/tokenizer') return <TokenizerExample />;
  if (path === '/tokenizer-direct') return <TokenizerDirectExample />;
  if (path === '/3ds') return <ThreeDSExample />;
  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Route />
  </React.StrictMode>,
);
