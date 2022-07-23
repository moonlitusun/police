import React, { DependencyList } from 'react';
import { subscribeQuote, snapshotExtendsFields, extendsFields } from '@dz-web/quote-client';
import type { Market, Code, Stock, IGenericObject } from '@dz-web/quote-client';
import { useQuoteClient } from './use-quote-client';

const { useEffect, useState, useRef } = React;
const hashCode = (market: Market, code: Code): string => `${market}_${code}`;

class StockMap {
  private readonly stockMap: IGenericObject;

  constructor(list: Stock[]) {
    this.stockMap = list.reduce((prev, curr, idx) => {
      prev[hashCode(curr.market, curr.code)] = idx;
      return prev;
    }, {} as IGenericObject);
  }

  public has(market: number, code: Code) {
    return hashCode(market, code) in this.stockMap;
  }

  public getIndex(market: Market, code: Code): number {
    if (this.has(market, code)) {
      return this.stockMap[hashCode(market, code)];
    }

    return -1;
  }
}

export function mergeCommodityDataList(oldData: IGenericObject[], oldCodeMap: StockMap, newData: IGenericObject[]) {
  const arr = [...oldData];

  newData.forEach((d) => {
    const { market: m, code: c } = d;
    const idx = oldCodeMap.getIndex(m, c);
    if (idx !== -1) {
      const rs = { ...arr[idx], ...d };
      arr.splice(idx, 1, rs);
    }
  });

  return arr.map((item) => extendsFields(item, snapshotExtendsFields));
}

export function mergeCommodityData(oldData: IGenericObject[], newData: IGenericObject[]) {
  return extendsFields({ ...oldData, ...newData });
}

const voidFn = () => ({});

type QueryStaticDataRes = { marketId: Market, code: Code, [prop: string]: any }[];

export function useSubscribeStockListQuote(queryStaticData: (wsClient: any) => Promise<QueryStaticDataRes>, dependencies: DependencyList) {
  const { wsClient, isWsClientReady } = useQuoteClient();
  const [stock, setStock] = useState<IGenericObject[]>([]);
  const stockData = useRef<IGenericObject[]>([]);

  useEffect(() => {
    let flag = true;
    if (!isWsClientReady || !wsClient || typeof queryStaticData !== 'function') return voidFn;

    let subKey: number;

    queryStaticData(wsClient)
      .then((data = []) => {
        if (data.length === 0) {
          setStock([]);
          stockData.current = [];
          return;
        };

        stockData.current = data;
        if (flag) setStock(data);

        const codeList: any = data.map((i: any) => ({ market_id: i.marketId, code: i.code }));
        const stockMap = new StockMap(codeList);

        subKey = subscribeQuote(wsClient, codeList, (newData: IGenericObject[]) => {
          stockData.current = mergeCommodityDataList(stockData.current, stockMap, newData);
          if (flag) setStock(stockData.current);
        });
      })
      .catch(() => {
        if (flag) setStock([]);
      })

    return () => {
      flag = false;
      if (!subKey) return;
      wsClient.unsubscribe(subKey);
    };
  }, [...dependencies, isWsClientReady]);

  return stock;
}
