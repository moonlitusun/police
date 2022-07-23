import * as React from 'react';
import { WSClient, WSClientEventType, LoggerLevel } from '@dz-web/quote-client';
import type { WSClientConfig, ErrorRes } from '@dz-web/quote-client';
import { QuoteClientContext } from './context';

const { useEffect } = React;

interface IProps extends WSClientConfig {
  children: React.ReactElement;
  onError?: (res: ErrorRes) => void;
}

const QuoteClientProvider: React.FC<IProps> = (props) => {
  const { children, token, url, logLevel = LoggerLevel.ERROR, onError: errorCallback } = props;
  const clientRef = React.useRef<any>(null);
  const isConnecting = React.useRef(false);

  const [isConnected, setIsConnected] = React.useState(false);

  function onOpen() {
    isConnecting.current = false;

    setIsConnected(true);
  }

  function onClose() {
    isConnecting.current = false;

    setIsConnected(false);
  }

  function onConnecting() {
    isConnecting.current = true;
  }

  function onError(res: ErrorRes) {
    if (errorCallback) errorCallback(res);
  }

  useEffect(() => {
    if (!token || !url) return;

    clientRef.current = new WSClient({
      logLevel,
      url,
      token,
    });
    const { emitter, connect } = clientRef.current;

    emitter.on(WSClientEventType.open, onOpen);
    emitter.on(WSClientEventType.close, onClose);
    emitter.on(WSClientEventType.error, onError);
    emitter.on(WSClientEventType.connecting, onConnecting);
    connect();

    return close;
  }, [token, url]);

  return (
    <QuoteClientContext.Provider
      value={{
        wsClient: clientRef.current,
        isWsClientReady: Boolean(isConnected && clientRef.current)
      }}
    >
      {children}
    </QuoteClientContext.Provider>
  );
};

export default QuoteClientProvider;


