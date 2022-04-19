import {   MicropRouter , MicropHandler,} from "../app";
import { createRegexpUrl } from "./createRegexp";
import { Methods, StackItem } from "../core/core";
import { MicropMiddleware } from "../app/middleware";


const createParams = (path: string) => {

    const segments = path.split("/").filter(s => s !== "").reduce((t,c,i)=> {
         if(/^:/.test(c)) return {...t, [c.replace(/^:/,"")]: i}
         return t  }, {})
    return segments
}
export default (
    method: Methods, 
    path: string,  
    handlers: Array<MicropHandler|MicropMiddleware> ): StackItem[] => {
    let regexp: RegExp
    let params: Record<string, unknown> = {}

    if(path == "*")  regexp = /.*/g
    else {
        regexp = createRegexpUrl(path),
        params = createParams(path)
    }
    const stack: StackItem = {
        regexp,
        params,
        method,
        handlers,
        endpointPath: path
    }

    return [stack]
}
