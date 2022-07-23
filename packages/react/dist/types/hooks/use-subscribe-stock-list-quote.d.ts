import { DependencyList } from 'react';
import type { Market, Code, IStock, IGenericObject } from '@dz-web/quote-client';
declare class StockMap {
    private readonly stockMap;
    constructor(list: IStock[]);
    has(market: number, code: Code): boolean;
    getIndex(market: Market, code: Code): number;
}
export declare function mergeCommodityDataList(oldData: IGenericObject[], oldCodeMap: StockMap, newData: IGenericObject[]): any[];
export declare function mergeCommodityData(oldData: IGenericObject[], newData: IGenericObject[]): any;
declare type QueryStaticDataRes = {
    marketId: Market;
    code: Code;
    [prop: string]: any;
}[];
export declare function useSubscribeStockListQuote(queryStaticData: (wsClient: any) => Promise<QueryStaticDataRes>, dependencies: DependencyList): IGenericObject[];
export {};
//# sourceMappingURL=use-subscribe-stock-list-quote.d.ts.map