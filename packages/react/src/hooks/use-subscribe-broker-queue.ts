import React from 'react';
import { subscribeBrokerQueue, queryBrokerQueue } from '@dz-web/quote-client';
import type { QueryBrokerQueueRes, Market, Code } from '@dz-web/quote-client';
import { useQuoteClient } from './use-quote-client';

const { useEffect, useState } = React;

const defaultBrokerQueue: any = { buyLevelList: [], sellLevelList: [] };

export function useSubscribeBrokerQueue(market: Market, code: Code) {
  const { wsClient, isWsClientReady } = useQuoteClient();
  const [data, setData] = useState<any>(defaultBrokerQueue);

  useEffect(() => {
    let flag = true;
    if (!isWsClientReady || !wsClient) return defaultBrokerQueue;

    let subKey: number;

    queryBrokerQueue(wsClient, {
      symbols: [[market, code]]
    })
      .then((res: any) => {
        setData(res);
        subKey = subscribeBrokerQueue(wsClient, [{ market_id: market, code }], (newData: any) => {
          if (flag) setData(newData[0] ?? { buyLevelList: [], sellLevelList: [] });
        });
      })

    return () => {
      flag = false;
      if (!subKey) return;
      wsClient.unsubscribe(subKey);
    };
  }, [market, code, isWsClientReady]);

  return data;
}
