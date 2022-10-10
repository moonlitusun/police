import React from 'react';
import { ErrorBoundaryPropsWithFallback } from "react-error-boundary";
export interface IErrorBoundaryProps extends ErrorBoundaryPropsWithFallback {
    children: React.ReactElement;
    logger: any;
    onError?: (error: Error, info: {
        componentStack: string;
    }) => void;
}
export declare function ErrorBoundaryWithLogger(props: IErrorBoundaryProps): JSX.Element;
//# sourceMappingURL=index.d.ts.map