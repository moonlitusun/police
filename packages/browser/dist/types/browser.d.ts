import { Logger } from './logger';
export interface ErrorData {
    type: string;
    message: string;
    stack: any;
    reason: string | undefined;
}
export declare type Callback = (error: ErrorData) => void;
export declare function browserErrorHandle(logger: Logger, error: any, callback?: Callback): void;
export declare function watchGlobalError(logger: Logger, callback: Callback): void;
//# sourceMappingURL=browser.d.ts.map