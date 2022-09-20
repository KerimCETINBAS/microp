import { MicropHandler, MicropMiddleware } from "./handler"


export type MicropStackType = Map<RegExp, MicropStackItem>



export class MicropStackItem {
    path?: string | RegExp = /.*/
    pathRegexp: RegExp
    params: Record<string,string> = {}
    private handlers: {handler: MicropMiddleware | MicropHandler, handlerType: "Middleware" | "Handler" }[] = []
    
    constructor(path: string, pathRegexp:RegExp, params: Record<string,string>, handler: (MicropMiddleware | MicropHandler)[] | MicropHandler | MicropMiddleware) {
        this.pathRegexp = pathRegexp
        this.path = path
        this.params= params
        if (handler instanceof Array<MicropHandler | MicropMiddleware>) {
            
            handler.forEach( h => this.addHandler(h))
        }

        else this.addHandler(handler)

    }
    public get Handlers() { return this.handlers } 

    public addHandler(handler: MicropHandler | MicropMiddleware) {
        this.handlers.push({
            handlerType: handler instanceof MicropMiddleware ? "Middleware" : "Handler",
            handler
        })
    }
}


export interface IMicropStackable {
    stacks: MicropStackType
}


