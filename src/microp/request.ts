import EventEmitter from "events";
import { IncomingMessage, Server, ServerResponse } from "http";
import { IMicropBodyOptions, MicropBody } from "./body";

export class MicropRequest extends EventEmitter{


    private originalRequest: IncomingMessage
    private originalResponse: ServerResponse
    private _params: Record<string,string | number> = {}
    private setBody = false;
    private setParam = false;
    private _body?: Record<string, unknown> 
    locals: Record<string,unknown> = {}
    constructor(req: IncomingMessage, res: ServerResponse) {
        super()
        this.originalRequest = req
        this.originalResponse = res
       
    }

    get _originalRequest(): IncomingMessage {
        return this.originalRequest
    }

    get _originalResponse(): ServerResponse {
        return this.originalResponse
    }

    set params(val: Record<string,string|number>) {
        if(!this.setParam)
        {
            this._params = val
            this.setParam = true
        }
        
    }

    async body(options:IMicropBodyOptions) {
        if(this._body) return this._body
        return this._body =await ( new MicropBody(this.originalRequest)).body(options)
    }

    get params(): Record<string, string | number> {

     
        return this._params
    }

}