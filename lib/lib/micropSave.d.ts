/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
export declare enum Methods {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Patch = "PATCH",
    Delete = "DELETE"
}
export interface IRequest {
    error?: any;
    body?: undefined | string | Uint16Array | Record<string, unknown>;
    headers: Record<string, string>;
    queryParams: URLSearchParams;
    params: Record<string, string | number> | undefined;
}
export interface IResponse {
    status?: number;
    body?: Record<string, unknown> | string | number | Array<unknown> | Uint16Array | undefined;
    headers?: Record<string, string>;
}
export interface IEndpoint {
    regexp?: RegExp;
    path: string;
    method: Methods;
    handler: (request: IRequest) => IResponse;
}
export interface IEndpointStack {
    regexp?: RegExp;
    path: string;
    method: Methods;
    params: Record<string, string | number | undefined>;
    handler: (request: IRequest) => IResponse;
}
export interface IServiceOptions {
}
declare class CreateService {
    private server;
    private middleWareStack;
    private endpoints;
    constructor(options?: IServiceOptions);
    useMiddleware(middleware: (_req: IncomingMessage, _res: ServerResponse, next: (error?: any) => void) => void): this;
    addEndpoint(endpoint: IEndpoint): this;
    listen(port: number, callback: () => void): this;
}
export { CreateService };
//# sourceMappingURL=micropSave.d.ts.map