export interface LoggerOptions {
    url: string;
    label: string;
    batchInterval?: number;
    userInfo: () => void | string;
}
export declare class Logger {
    private url;
    private label;
    private batchInterval;
    private batchTimer;
    private batchMessage;
    private userInfo;
    constructor(options: LoggerOptions);
    postData(data?: {}): Promise<any>;
    private createBatch;
    private createMetaInfo;
    error(message: any): Promise<any>;
    info(message: any): void;
    infoImmediately(message: any): Promise<any>;
}
//# sourceMappingURL=logger.d.ts.map