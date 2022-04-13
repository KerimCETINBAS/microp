import { Methods, MicropHandler } from "../core/types"
import { MicropEndpoint } from "../microp/endpoint"
import { MicropRouter } from "../router"

export const createEndpoint = 
(method: Methods, path: string |  MicropHandler | MicropHandler[], 
handler?: MicropHandler | MicropHandler[]) : MicropEndpoint[] =>  {

    
    
    const endpoints: MicropEndpoint[] = []
    console.log("router", MicropRouter)
    if( path instanceof MicropRouter) {
        // handler router

        console.log("router")
    }
    else if(Array.isArray(path) && typeof handler !== undefined) {
        if(!(path.length > 0)) throw new Error("registering endpoint without handler")
        // multiple handler without path

      
        for(const _handler of path) {
            
            endpoints.push(new MicropEndpoint(Methods.ANY, "/", _handler))
        }
    }
    else if(typeof path == "function") {
        //single handler without path
        endpoints.push(new MicropEndpoint(Methods.ANY, "/", <MicropHandler>handler))
     
    }
  /*   else if(typeof path === 'string' && handler instanceof MicropRouter) {
        // handler router
        console.log("router")
    } */
    else if(typeof path === 'string' && typeof handler == "function") {
        //single handler "with" path

        console.log("single")
        endpoints.push(new MicropEndpoint(Methods.ANY, path, <MicropHandler>handler))
      

    }
    else if(typeof path === 'string' && Array.isArray(handler)) {
        if(!(handler.length > 0)) throw new Error("registering endpoint without handler")

        for(const _handler of handler) {

            endpoints.push(new MicropEndpoint(Methods.ANY, path, _handler))
        }
    }
    
    else if(typeof path === 'undefined'){
        console.log("no handler")
        throw new Error("registering endpoint without handler")
    }

  
    return endpoints
}
