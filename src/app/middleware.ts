import { Methods, StackItem } from "../core/core"
import { MicropHandler } from "./microp"

export class MicropMiddleware  {

    req: any
    res: any
    regexp: RegExp = new RegExp("")
    params: Record<string, unknown> = {}
    endpointPath: string = ""
    method: Methods = Methods.ALL
    handlers: Array<MicropHandler>= []
    handler
    constructor(handler: (req:any, res:any, next?: (error?:string)=>void)=>void) {
       
        this.handler = handler
        

    }
   
}