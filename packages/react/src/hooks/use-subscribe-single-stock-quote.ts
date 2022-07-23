import { Market, Code, QUOTE_CATEGORY_FIELD, querySnapshot } from '@dz-web/quote-client';
import { useSubscribeStockListQuote } from './use-subscribe-stock-list-quote';

export function useSubscribeSingleStockQuote(marketId: Market, code: Code, fields: string[] = []): any {
  const hasCodeOrMarketId = code && marketId;

  const rs = useSubscribeStockListQuote((wsClient: any) => (hasCodeOrMarketId ? querySnapshot(wsClient, {
    symbols: [[marketId, code]],
    fields: [QUOTE_CATEGORY_FIELD.QUOTE, QUOTE_CATEGORY_FIELD.INFO, ...fields]
  })
    : Promise.resolve([]) ), [marketId, code]);

  const value = rs.length ? rs[0] : { marketId, code };

  return value;
}
