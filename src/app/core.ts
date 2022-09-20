import { IncomingMessage, Server, ServerResponse } from "http"
import createRegexpFromPath from "../helpers/createRegexpFromPath"
import getStackFromMap from "../helpers/getStackFromMap"
import createStackItem from "../internal/createStackItem"
import { MicropHandler, MicropMiddleware } from "../internal/handler"
import { MicropRequest } from "../internal/request"
import { IMicropStackable, MicropStackItem, MicropStackType } from "../internal/stack"
import { MicropRouter } from "./router"


export interface IMicropServer {
    server: Server<typeof IncomingMessage, typeof ServerResponse>
    listen(port: number, callback?: () => void): this
}


export class Core implements IMicropStackable  {
    public stacks: MicropStackType = new Map<RegExp, MicropStackItem>()
    
    use(handler: MicropHandler | MicropHandler[] | MicropMiddleware | MicropRouter): this
    use(path: string | RegExp, handler: MicropHandler | MicropRouter | MicropMiddleware  | (MicropMiddleware | MicropHandler | MicropRouter)[] ): this
    use(path: unknown, handler?: unknown): this {
        // let regex
        // let handlers: Array<MicropHandler | MicropRouter | MicropMiddleware> = []
        // if (typeof path === "string") {
            
        //     regex = createRegexpFromPath(path)

        //     if (handler instanceof Array<MicropHandler | MicropRouter | MicropMiddleware>) {
                
        //         for (const h of handler) {
        //             h instanceof Function ? handlers = [...handlers, h] : false
        //             h instanceof MicropRouter ? handlers = [...handlers, h.stack]
        //         }
        //     }
        // }
        if (typeof path == "string") {
            // fresh create
            const [r, h] = createStackItem(path, handler as (MicropHandler | MicropMiddleware)) as [RegExp, MicropStackItem]
           
            // check if exist
            const stack = getStackFromMap(path, this.stacks)
            
            // if not exist
            stack == null ? this.stacks.set(r, h) : (

                // if exist
                stack.Handlers.forEach(stackHandler => h.addHandler(stackHandler.handler)),

                console.log(this.stacks, stack),
                this.stacks.set(r, stack)

                
            )
        
        }

        else { 

            const [r, h] = createStackItem(undefined, handler as (MicropHandler | MicropMiddleware)) as [RegExp, MicropStackItem]
            const stack = getStackFromMap("", this.stacks)
            stack == null ? this.stacks.set(r, h) : (
                h.Handlers.forEach(ha => stack.addHandler(ha.handler)),
                this.stacks.set(r, h)
            )
        }
       
      
        return this 
    }
   
    
}

