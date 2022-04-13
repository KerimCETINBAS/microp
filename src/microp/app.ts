
import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { MicropCore } from "../core";
import { VoidNoParamCallback } from "../core/types";
import { MicropEndpointError } from "../util/error";
import { MicropEndpoint } from "./endpoint";
import micropListener from "./micropListener";



interface IMicropOptions {
    exposeOverTCP?: boolean;
}





export class Microp extends MicropCore implements IMicropOptions {
    private _server: Server = createServer()
    readonly exposeOverTCP: boolean
 
    
    constructor(options?: IMicropOptions) { 
        super() 
        this.exposeOverTCP = options?.exposeOverTCP ? options?.exposeOverTCP : false
        this._server.on("request", 
            (req:IncomingMessage, res:ServerResponse) => 
            micropListener(req,res, this._stack))
        }
    
  
    // allow users get stack but do not let manuplate   
    get stack(): MicropEndpoint[] {
        return this._stack
    } 


    



    listen(port: number, callback?: VoidNoParamCallback): this {
       
        this._server.listen(port, ()=> {
            callback ? callback() : null
 
        })
          
       
        return this
    }

    
}

 