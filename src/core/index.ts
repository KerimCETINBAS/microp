import { EventEmitter } from "events"
import { IncomingMessage, ServerResponse } from "http"
import { MicropRouter } from "../app"
import { MicropBody } from "../body"

export enum EMicropMethod {
    USE = 0,
    GET ,
    POST,
    PUT,
    PATCH,
    DELETE,
    HEAD,
    OPTIONS
}

export const MicropMethod: Record<number,RegExp> = {
    0: /^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)$/i,
    1: /^GET$/i,
    2: /^POST$/i,
    3: /^PUT$/i,
    4: /^PATCH$/i,
    5: /^DELETE$/i,
    6: /^HEAD$/i,
    7: /^OPTIONS$/i
}

export interface IOriginalRequest extends IncomingMessage {
    [key:string]: unknown
    locals: Record<string,unknown>
}


export interface IOriginalResponse extends ServerResponse {
    [key:string]: unknown
}

export interface IMicropRequest {
    body: MicropBody
    cookies: Record<string,string>
    headers: Record<string,string>
    method?: string,
    url?: string,
    params?: Record<string,string>
    locals?: Record<string,unknown>,
    query?: Record<string,string | string[]>
}
export interface IMicropResponse {
  
    status?: number,
    body?: string | Buffer | Uint8Array | Record<string,unknown> | Array<unknown> | File
    headers?: Record<string,string>
    cookies?: any
    locals?: Record<string,unknown>
}
/**
 * 
 */
export interface IStackItem { 
    path?: string, 
    method: RegExp,
    regexpPath?: RegExp, 
    handler:  MicropHandler | MicropMiddleware
    params?: Record<string,string>
    cookies?: Record<string,string>
    query?: Record<string,string>
    isMiddleware: boolean
}
export type MicropHandler = (request: IMicropRequest) => Promise<IMicropResponse> | IMicropResponse

export class MicropMiddleware {
    constructor(
        readonly middleWareFunc: (
                req: IncomingMessage, 
                res: ServerResponse, 
                next: (error?: unknown) => void
        ) => void) {

    }
} 


export abstract class Core extends EventEmitter {

    protected stack: IStackItem[] = []
    public get Stack(): IStackItem[] { return this.stack }

    abstract use(handler: MicropHandler | MicropRouter | MicropMiddleware): this 
    abstract use(path:string, handler:MicropHandler | MicropRouter | MicropMiddleware): this
    abstract use(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this
    abstract use(path:string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this

    abstract get(handler: MicropHandler | MicropRouter | MicropMiddleware): this 
    abstract get(path:string, handler:MicropHandler | MicropRouter | MicropMiddleware): this
    abstract get(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this
    abstract get(path:string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this

    abstract post(handler: MicropHandler | MicropRouter | MicropMiddleware): this 
    abstract post(path:string, handler:MicropHandler | MicropRouter | MicropMiddleware): this
    abstract post(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this
    abstract post(path:string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this
    

    abstract put(handler: MicropHandler | MicropRouter | MicropMiddleware): this 
    abstract put(path:string, handler:MicropHandler | MicropRouter | MicropMiddleware): this
    abstract put(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this
    abstract put(path:string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this

    abstract patch(handler: MicropHandler | MicropRouter | MicropMiddleware): this 
    abstract patch(path:string, handler:MicropHandler | MicropRouter | MicropMiddleware): this
    abstract patch(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this
    abstract patch(path:string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this

    abstract delete(handler: MicropHandler | MicropRouter | MicropMiddleware): this 
    abstract delete(path:string, handler:MicropHandler | MicropRouter | MicropMiddleware): this
    abstract delete(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this
    abstract delete(path:string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this

    abstract head(handler: MicropHandler | MicropRouter | MicropMiddleware): this 
    abstract head(path:string, handler:MicropHandler | MicropRouter | MicropMiddleware): this
    abstract head(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this
    abstract head(path:string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this

    abstract option(handler: MicropHandler | MicropRouter | MicropMiddleware): this 
    abstract option(path:string, handler:MicropHandler | MicropRouter | MicropMiddleware): this
    abstract option(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this
    abstract option(path:string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this
  
}


