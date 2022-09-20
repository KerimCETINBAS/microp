import { IMicropOriginalRequest, MicropRequest } from "./request";
import { MicropResponse_ } from "./response";
export declare type MicropMiddlewareType = (request?: IMicropOriginalRequest, response?: IMicropOriginalRequest, next?: (error?: string) => void) => void;
export declare class MicropMiddleware {
    MiddlewareHandler: MicropMiddlewareType;
    constructor(MiddlewareHandler: MicropMiddlewareType);
}
export declare enum HandlerType {
    Function = 0,
    Router = 1,
    Middleware = 2,
    Array = 3
}
export declare type MicropHandler = (request: MicropRequest) => MicropResponse_;
//# sourceMappingURL=handler.d.ts.map