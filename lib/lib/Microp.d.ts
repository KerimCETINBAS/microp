/// <reference types="node" />
import { IncomingMessage, Server, ServerResponse } from "http";
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
    cookies: Record<string, string> | undefined;
    [key: string]: unknown;
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
    hooks?: Array<(request: IRequest) => Record<string, unknown> | void>;
    handler: (request: IRequest) => IResponse;
}
export interface IEndpointStack {
    regexp?: RegExp;
    path: string;
    method: Methods;
    params: Record<string, string | number | undefined>;
    hooks?: Array<(request: IRequest) => Record<string, unknown> | void>;
    handler: (request: IRequest) => IResponse;
}
export interface IServiceOptions {
}
declare class HTTPError extends Error {
    status: number;
    constructor({ status, message }: {
        status: number;
        message: string;
    });
}
declare class CreateService {
    readonly server: Server;
    private middlewares;
    private endpoints;
    constructor();
    use(middleware: (req: IncomingMessage, res: ServerResponse, next?: (err?: any) => void) => void | any): this;
    addEndpoint(endpoint: IEndpoint): this;
    listen(port: number, callback?: () => void): this;
}
export { CreateService, HTTPError };
//# sourceMappingURL=Microp.d.ts.map