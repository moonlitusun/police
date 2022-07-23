import * as React from 'react';
import type { WSClientConfig, ErrorRes } from '@dz-web/quote-client';
interface IProps extends WSClientConfig {
    children: React.ReactElement;
    onError?: (res: ErrorRes) => void;
}
declare const QuoteClientProvider: React.FC<IProps>;
export default QuoteClientProvider;
//# sourceMappingURL=provider.d.ts.map