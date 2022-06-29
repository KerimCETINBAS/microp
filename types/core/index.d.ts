/// <reference types="node" />
import { EventEmitter } from "events";
import { IncomingMessage, ServerResponse } from "http";
import { MicropRouter } from "../app";
import { MicropBody } from "../body";
export declare enum EMicropMethod {
    USE = 0,
    GET = 1,
    POST = 2,
    PUT = 3,
    PATCH = 4,
    DELETE = 5,
    HEAD = 6,
    OPTIONS = 7
}
export declare const MicropMethod: Record<number, RegExp>;
export interface IOriginalRequest extends IncomingMessage {
    [key: string]: unknown;
    locals: Record<string, unknown>;
}
export interface IOriginalResponse extends ServerResponse {
    [key: string]: unknown;
}
export interface IMicropRequest {
    body: MicropBody;
    cookies: Record<string, string>;
    headers: Record<string, string>;
    method?: string;
    url?: string;
    params?: Record<string, string>;
    locals?: Record<string, unknown>;
    query?: Record<string, string | string[]>;
}
export interface IMicropResponse {
    status?: number;
    body?: string | Buffer | Uint8Array | Record<string, unknown> | Array<unknown>;
    headers?: Record<string, string>;
    cookies?: any;
    locals?: Record<string, unknown>;
}
/**
 *
 */
export interface IStackItem {
    path?: string;
    method: RegExp;
    regexpPath?: RegExp;
    handler: MicropHandler | MicropMiddleware;
    params?: Record<string, string>;
    cookies?: Record<string, string>;
    query?: Record<string, string>;
    isMiddleware: boolean;
}
export declare type MicropHandler = (request: IMicropRequest) => Promise<IMicropResponse> | IMicropResponse;
export declare class MicropMiddleware {
    readonly middleWareFunc: (req: IncomingMessage, res: IncomingMessage, next?: (error?: unknown) => void) => void;
    constructor(middleWareFunc: (req: IncomingMessage, res: IncomingMessage, next?: (error?: unknown) => void) => void);
}
export declare abstract class Core extends EventEmitter {
    protected stack: IStackItem[];
    get Stack(): IStackItem[];
    abstract use(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract use(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract use(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
    abstract use(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
    abstract get(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract get(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract get(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
    abstract get(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
    abstract post(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract post(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract post(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
    abstract post(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
    abstract put(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract put(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract put(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
    abstract put(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
    abstract patch(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract patch(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract patch(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
    abstract patch(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
    abstract delete(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract delete(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract delete(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
    abstract delete(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
    abstract head(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract head(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract head(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
    abstract head(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
    abstract option(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract option(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
    abstract option(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
    abstract option(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
}
