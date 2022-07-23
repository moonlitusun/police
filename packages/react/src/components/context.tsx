import React from 'react';
import { WSClient } from '@dz-web/quote-client';

export interface IClientContext {
  wsClient: WSClient | null;
  isWsClientReady: boolean;
}

export const QuoteClientContext = React.createContext<IClientContext>({ wsClient: null, isWsClientReady: false });

// if (process.env.NODE_ENV !== 'production') {
  QuoteClientContext.displayName = 'QuoteWSClient';
// }

export default QuoteClientContext;
