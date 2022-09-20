import { MicropRouter } from "../app/router";
import { IMicropOriginalRequest, MicropRequest } from "./request";
import { MicropResponse_ } from "./response";


export type MicropMiddlewareType = (request?: IMicropOriginalRequest, response?: IMicropOriginalRequest, next?: (error?: string) => void) => void

export class MicropMiddleware {

    constructor(public MiddlewareHandler: MicropMiddlewareType) {}
}
export enum HandlerType {
    Function = 0,
    Router,
    Middleware,
    Array
}


export type MicropHandler = (request: MicropRequest) => MicropResponse_