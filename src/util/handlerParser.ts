import { default as createStack } from "./createStack";
import { MicropHandler, MicropRouter } from "../app";
import { MicropMiddleware } from "../app/middleware";
import { Methods as method, StackItem } from "../core/core";

export default (method: method, path: string | MicropHandler | MicropHandler[] | MicropRouter| MicropMiddleware ,handler?: MicropHandler | MicropHandler[] | MicropRouter | MicropMiddleware, mPath?: string): StackItem[] => {
    if(typeof path == "string") {
        if(handler instanceof MicropRouter)   return handler.Stack
        else if(handler instanceof MicropMiddleware) {
            
            
            return createStack(method,  mPath + path, [handler])
        }
        else if(typeof handler == "object")  return createStack(method,  mPath + path, handler as Array<MicropHandler | MicropMiddleware>)
        else return createStack(method, mPath + path,  [ handler as MicropHandler | MicropMiddleware] )
    }
    else { 
        if(path instanceof MicropRouter) return path.Stack
        else if(path instanceof MicropMiddleware) {
            return createStack(method,  mPath + "*", [path])
        }
        else if(typeof path == "object") {
            // array
            return createStack(method,  mPath + "*", path as Array<MicropHandler | MicropMiddleware>)
        }
        else {
            // single
            return createStack(method,  mPath + "*",  [ path as MicropHandler | MicropMiddleware] )
        }
       
    }
}


