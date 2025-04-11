import { Logger, watchGlobalError } from '@dz-web/police-browser';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './app';
import './index.css';

export const logger = new Logger({
  url: 'http://172.16.11.89:6001',
  label: 'test',
  userInfo: () => 'mobile: 张三',
});

watchGlobalError(logger);

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export default {
  title: 'ESBoot Demo',
};
