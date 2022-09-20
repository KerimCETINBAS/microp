import { IncomingHttpHeaders, IncomingMessage  } from "http";
import getStackFromMap from "../helpers/getStackFromMap";
import { MicropBody } from "./body";
import { MicropHandler } from "./handler";
import { getParams } from "./param";
import { IMicropOriginalResponse } from "./response";
import setHeaders from "./setHeaders";
import { MicropStackType } from "./stack";

export class MicropRequest { 
    constructor(
        public path: string,
        public headers: IncomingHttpHeaders,
        public params: Record<string,string>,
        public locals: Record<string, unknown> = {},
        public body: MicropBody) { }
       
    
}


export interface IMicropOriginalRequest extends IncomingMessage {
    [key:string]: any
}
 
export const CompansateRequest = (stacks:MicropStackType) => async (req: IMicropOriginalRequest,res: IMicropOriginalResponse) => {
    const url: string = req.url || ""
    
    // urlnin denk geldigi bir stack varsa bul, yoksa 404 
    const stack = getStackFromMap(url, stacks)
    
    if (!stack) return res.end(
        `<html> 
            <head>
                <title> 404 |  ${url}  </title>
            </head>
            <body>
                <span> Can Not ${req.method} Path ${url} </span> 
                </body>
        </html>`).statusCode = 404;
 
    const params = getParams(url, stack.params)
    const request = new MicropRequest(url, req.headers, params, {}, new MicropBody(req))
    let i = 0

    console.log(stack.Handlers.length)
    for await (const { handler } of stack.Handlers) {
        const response = (handler as MicropHandler)(request)
        setHeaders(response.headers || {}, res)
        res.statusCode = response.status || 200

        console.log(response.nextHandler, i)
        if (!response.nextHandler) {
            response.sendResponse ? res.end(response.body) : res.end()
            
        }
        else {
            i++

            request.locals = { ...request.locals, ...response.locals }
            console.log(request.locals)
        }
    }
    return;
}