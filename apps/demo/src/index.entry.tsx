import { watchGlobalError } from '@dz-web/police-browser';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './app';
import './index.css';
import { logger } from './logger';

watchGlobalError(logger);

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export default {
  title: 'ESBoot Demo',
};
