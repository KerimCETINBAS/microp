import {EventEmitter} from "events";
import {  MicropRouter} from "..";
import { MicropHandler } from "../app";
import { MicropMiddleware } from "../app/middleware";
import { default as createStack } from "../util/createStack";
import handlerParser from "../util/handlerParser";

export interface StackItem {
    regexp: RegExp
    method: Methods
    params: Record<string,unknown>
    endpointPath: string
    handlers:Array<MicropHandler|MicropMiddleware>
}
export interface MiddleWareStackItem {

}


export enum Methods {
    ALL = "ALL",
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS"
}

export class MicropCore extends EventEmitter {
    protected _stack: Array<StackItem | MicropMiddleware>= []
    protected _path?: string 
    constructor()
    constructor(options: any)
    constructor(options?: any){
        super()
    }

    use(path:MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware): this
    use(path: string ,handler: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware):this
    use(path: string | MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware ,handler?: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware ):this {
        
      
        this._stack.push(...handlerParser(Methods.ALL,  path, handler, this._path || ""))
        return this
    }

    get(path:MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware): this
    get(path: string ,handler: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware):this
    get(path: string | MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware ,handler?: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware ):this {

        this._stack.push(...handlerParser(Methods.GET, path, handler, this._path || ""))
        return this;
    }

    post(path:MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware): this
    post(path: string ,handler: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware):this
    post(path: string | MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware ,handler?: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware ):this {

        this._stack.push(...handlerParser(Methods.POST, path, handler, this._path || ""))
        return this;
    }

    put(path:MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware): this
    put(path: string ,handler: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware):this
    put(path: string | MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware ,handler?: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware ):this {

        this._stack.push(...handlerParser(Methods.PUT, path, handler, this._path || ""))
        return this;
    }

    patch(path:MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware): this
    patch(path: string ,handler: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware):this
    patch(path: string | MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware ,handler?: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware ):this {

        this._stack.push(...handlerParser(Methods.PATCH, path, handler, this._path || ""))
        return this;
    }

    delete(path:MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware): this
    delete(path: string ,handler: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware):this
    delete(path: string | MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware ,handler?: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware ):this {

       
        this._stack.push(...handlerParser(Methods.DELETE, path, handler, this._path || ""))
        return this;
    }

    head(path:MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware): this
    head(path: string ,handler: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware):this
    head(path: string | MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware ,handler?: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware ):this {

        this._stack.push(...handlerParser(Methods.HEAD, path, handler, this._path || ""))
        return this;
    }

    options(path:MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware): this
    options(path: string ,handler: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware):this
    options(path: string | MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware ,handler?: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware ):this {

       
        this._stack.push(...handlerParser(Methods.OPTIONS, path, handler, this._path || ""))
        return this;
    }

    
}