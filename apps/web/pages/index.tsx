import { Button } from "ui";
import { Logger, watchGlobalError } from '@dz-web/police-browser';
import { useEffect } from 'react';

export const logger = new Logger({
  url: 'http://localhost:6001',
  label: 'police-web',
});

export default function Web() {
  function log() {
    console.log(caches.a.cc);
    // logger.info({ message: Math.random() })
  }

  function error() {
    logger.error({ message: Math.random(), from: 'roc' })
  }

  useEffect(() => {
    watchGlobalError(logger);
  }, []);

  return (
    <div>
      <h1>Web</h1>

      <button onClick={log}>LOG</button>
      <button onClick={error}>ERROR</button>
      <Button />
    </div>
  );
}
