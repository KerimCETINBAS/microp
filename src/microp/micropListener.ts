import { IncomingMessage, Server, ServerResponse } from "http";
import { setParams } from "../util";
import { MicropBody } from "./body";
import { MicropEndpoint } from "./endpoint";
import { MicropRequest } from "./request";

export default async(req: IncomingMessage, res: ServerResponse, _stack:MicropEndpoint[]) => {

        const _request = new MicropRequest(req, res)
        
        let isBodyReturned: boolean = false
  
        for (const item of _stack) {
            if(isBodyReturned) break;
          
            if(item.regexpUrl.test(req.url || "")) {
               
                _request.params = setParams(req.url || "",item.params)
                for(const handler of item.handlers) {
                    if(isBodyReturned) break; 
                    const response =await  handler(_request)

                    if(response?.locals !== undefined) {
                        _request.locals = {..._request.locals, ...response.locals}
                    }
               
                    if(response?.body !== undefined) {
                        isBodyReturned = true
                        res.end(JSON.stringify(response.body))
                    }
                } 
                    
            }

        }
  
}