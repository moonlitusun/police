import { Button } from "ui";
import { Logger } from '@dz-web/police-browser';

const logger = new Logger({
  url: 'http://localhost:6001'
});

export default function Web() {
  function log() {
    logger.info({ message: Math.random() })
  }

  function error() {
    logger.error([{ message: Math.random(), from: 'roc' }])
  }

  return (
    <div>
      <h1>Web</h1>

      <button onClick={log}>LOG</button>
      <button onClick={error}>ERROR</button>
      <Button />
    </div>
  );
}
