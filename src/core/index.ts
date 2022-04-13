import {EventEmitter} from "events"
import { MicropEndpoint } from "../microp/endpoint"
import { MicropRequest } from "../microp/request";
import { createEndpoint } from "../util/createEndpoint"
import { Methods, MicropHandler } from "./types";


/**
 * @class MicriopCore
 * @description the class extended by App and Router
 * @description this class present Rest Methods to inherited class
 * 
 * @protected @property { MicropEndpoint } _stack - endpoint stack
 * @method use register an endpoint for all requests
 * @method get register an endpoint for get request
 * @method post register an endpoint for post requests
 * @method put register an endpoint for put requests
 * @method path register an endpoint for patch requests
 * @method delete register an endpoint for delete requests
 * @method head register an endpoint for head requests
 * @method options register endpoint for option requests 
 * 
 * @description all methods above @returns {this}
 * 
 * @example new Microp().get()
 *          @returns @class Microp
 */
export class MicropCore extends EventEmitter {
    
    protected _stack: MicropEndpoint[] = []

    
    use(handler:MicropHandler): this
    use(handler:MicropHandler[]): this
    use(path:string, handler:MicropHandler): this
    use(path: string,handler:MicropHandler[]):this
    use(path: string | MicropHandler | MicropHandler[], handler?:MicropHandler | MicropHandler[]): this {
        const stack = createEndpoint(Methods.ANY, path, handler)
        this._stack = this._stack.concat(stack)
        return this
    }
 
    
    get(handler:MicropHandler): this
    get(handler:MicropHandler[]): this
    get(path:string, handler:MicropHandler): this
    get(path: string,handler:MicropHandler[]):this
    get(path: string | MicropHandler | MicropHandler[], handler?:MicropHandler | MicropHandler[]): this {
        const stack = createEndpoint(Methods.GET, path, handler)
        this._stack = this._stack.concat(stack)
        return this
    }

    
    post(handler:MicropHandler): this
    post(handler:MicropHandler[]): this
    post(path:string, handler:MicropHandler): this
    post(path: string,handler:MicropHandler[]):this
    post(path: string | MicropHandler | MicropHandler[], handler?:MicropHandler | MicropHandler[]): this {
        const stack = createEndpoint(Methods.POST, path, handler)
        this._stack = this._stack.concat(stack)
        return this
    }
   
    put(handler:MicropHandler): this
    put(handler:MicropHandler[]): this
    put(path:string, handler:MicropHandler): this
    put(path: string,handler:MicropHandler[]):this
    put(path: string | MicropHandler | MicropHandler[], handler?:MicropHandler | MicropHandler[]): this {
        const stack = createEndpoint(Methods.PUT, path, handler)
        this._stack = this._stack.concat(stack)
        return this
    }
    
    patch(handler:MicropHandler): this
    patch(handler:MicropHandler[]): this
    patch(path:string, handler:MicropHandler): this
    patch(path: string,handler:MicropHandler[]):this
    patch(path: string | MicropHandler | MicropHandler[], handler?:MicropHandler | MicropHandler[]): this {
        const stack = createEndpoint(Methods.PATCH, path, handler)
        this._stack = this._stack.concat(stack)
        return this
    }
   
    delete(handler:MicropHandler): this
    delete(handler:MicropHandler[]): this
    delete(path:string, handler:MicropHandler): this
    delete(path: string,handler:MicropHandler[]):this
    delete(path: string | MicropHandler | MicropHandler[], handler?:MicropHandler | MicropHandler[]): this {
        const stack = createEndpoint(Methods.DELETE, path, handler)
        this._stack = this._stack.concat(stack)
        return this
    }


     
    head(handler:MicropHandler): this
    head(handler:MicropHandler[]): this
    head(path:string, handler:MicropHandler): this
    head(path: string,handler:MicropHandler[]):this
    head(path: string | MicropHandler | MicropHandler[], handler?:MicropHandler | MicropHandler[]): this {
        const stack = createEndpoint(Methods.HEAD, path, handler)
        this._stack = this._stack.concat(stack)
        return this
    }




    options(handler:MicropHandler): this
    options(handler:MicropHandler[]): this
    options(path:string, handler:MicropHandler): this
    options(path: string,handler:MicropHandler[]):this
    options(path: string | MicropHandler | MicropHandler[], handler?:MicropHandler | MicropHandler[]): this {
        const stack = createEndpoint(Methods.OPTIONS, path, handler)
        this._stack = this._stack.concat(stack)
        return this   
    }

   
 

   
}

export {MicropCore as RouterCore}