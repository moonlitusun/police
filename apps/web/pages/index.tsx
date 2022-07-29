import { Button } from "ui";
import { Logger } from '@dz-web-police/browser';

const logger = new Logger({
  url: 'http://192.168.31.136:6001'
});

export default function Web() {
  function log() {
    logger.log({ level: 'error', message: Math.random() })
  }

  return (
    <div>
      <h1>Web</h1>

      <button onClick={log}>LOG</button>
      <Button />
    </div>
  );
}
