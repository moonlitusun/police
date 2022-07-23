import React from 'react';
import { WSClient } from '@dz-web/quote-client';
export interface IClientContext {
    wsClient: WSClient | null;
    isWsClientReady: boolean;
}
export declare const QuoteClientContext: React.Context<IClientContext>;
export default QuoteClientContext;
//# sourceMappingURL=context.d.ts.map