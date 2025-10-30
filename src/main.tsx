import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import * as Sentry from '@sentry/react';
import App from './App.tsx'
import '@fontsource/ibm-plex-serif/400.css';
import '@fontsource/ibm-plex-serif/700.css';

Sentry.init({
  dsn: "https://c1a7d698f5a56875a34b6fa7cfbfa349@o4509776083550208.ingest.us.sentry.io/4510279538704384",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
