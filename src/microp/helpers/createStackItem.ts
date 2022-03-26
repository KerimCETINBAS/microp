import { createParams, createRegexpUrl } from "."
import { CreateMicropMiddleware, Methods, MicropHandler, MicropHook, MicropRouter, MicropStack } from ".."


export default (
    method: Methods, 
    path: string,  
    handlers: MicropHandler[]| MicropHandler | typeof CreateMicropMiddleware): MicropStack  => {
    
    const regexp = createRegexpUrl(path)
    const params = createParams(path)
    let stack: MicropStack


    if(handlers instanceof CreateMicropMiddleware) {
         stack = new MicropStack(regexp,method, params, handlers as CreateMicropMiddleware )
   
    }
  /*   else if(handlers instanceof MicropRouter) {  } */

    else if(typeof handlers == "function") { 
         
           

    
       
       
    }

    else if(Array.isArray( handlers)) {  
        if(handlers.length < 1) throw new Error(JSON.stringify({error: "nohandler", Message: "handler is not defined"}))
        else {
            
            stack = new MicropStack(regexp,method, params, handlers as MicropHandler[]  )
        }
    } 

    return stack!
    
}
