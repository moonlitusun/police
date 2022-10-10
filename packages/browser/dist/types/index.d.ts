export interface LoggerOptions {
    url: string;
    label: string;
    batchInterval?: number;
}
export declare class Logger {
    private url;
    private label;
    private batchInterval;
    private batchTimer;
    private batchMessage;
    constructor(options: LoggerOptions);
    postData(data?: {}): Promise<any>;
    private createBatch;
    error(message: any): Promise<any>;
    info(message: any): void;
    infoImmediately(message: any): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map