interface LoggerOptions {
    url: string;
}
export declare class Logger {
    private url;
    constructor(options: LoggerOptions);
    postData(data?: {}): Promise<any>;
    log(info: any): void;
}
export {};
//# sourceMappingURL=index.d.ts.map