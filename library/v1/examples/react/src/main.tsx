import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TokenizeExample from './TokenizeExample';
import { TokenizeDirectExample } from './TokenizeDirectExample';
import { ThreeDSExample } from './ThreeDSExample';

const path = window.location.pathname;

function Route() {
  if (path === '/tokenize') return <TokenizeExample />;
  if (path === '/tokenize-direct') return <TokenizeDirectExample />;
  if (path === '/3ds') return <ThreeDSExample />;
  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Route />
  </React.StrictMode>,
);
