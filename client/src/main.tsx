import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '@fontsource/saira/500.css';
import '@fontsource/saira/600.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import './i18n/index.ts';
import './editorWorker.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
