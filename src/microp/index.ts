import { createServer} from "http";
import type { IncomingMessage, Server, ServerResponse } from "http"
import { createParams, createRegexpUrl, IsJson } from "./helpers";
import createStackItem from "./helpers/createStackItem";
import EventEmitter from "events";
import { parse, stringify } from "querystring"
export enum Methods {

    NONE="undefined",
    GET="GET",
    POST="POST",
    PUT="PUT",
    PATCH="PATCH",
    DELETE="DELETE",
    ALL="ALL"
}   
 



export class MicropRouter { }


export interface IMicroOriginal {
    request: IncomingMessage
    response: ServerResponse
}

export type MicropHandler = ( request :MicropRequest) => MicropResponse

 
export type MicropHook =  (request: MicropRequest)=> MicropResponse
export interface IOriginals {
    originalRequest:  IncomingMessage
    originalResponse: ServerResponse
}

export interface IMicropMiddleware {

}


export class CreateMicropMiddleware extends EventEmitter {

    callback: (req: IncomingMessage, res: ServerResponse, next:()=> void)=>{}
    req: IncomingMessage | undefined
    res: ServerResponse  | undefined
    constructor(callback: (req: IncomingMessage, res: ServerResponse, next:()=> void)=> {}) {
        super()
        this.callback = callback

        
    }
    convert(req: IncomingMessage, res: ServerResponse, next: ()=>void): void {

        next()
    }
}


export type middleware = (req: IncomingMessage, res: ServerResponse, next: (error?: unknown) => void ) => void


export class MicropRequest  {
    
    
   
    body?: Body
    private  _cookies: Record<string, string> = {}
    private  _headers: Record<string, string> = {}
    private _locals: Record<string, unknown> = {}

    readonly originals: IMicroOriginal
    readonly host?: string
    readonly path?: string
    readonly queryStrings?: Record<string, unknown>
    private _rawbody?: Buffer

    constructor(req: IncomingMessage, res: ServerResponse) {
        this.originals = { request: req, response: res}
    }

    get rawbody(): Buffer | undefined {

        return this._rawbody
    }

    set rawbody(chunk: Buffer| undefined) {
        this._rawbody = chunk
    }


   

    get cookies(): Record<string,string> {
        return {}
    }
    set cookies(cookies: Record<string, string>) {

    }

    get headers(): Record<string, string> {
        return this._headers as  Record<string, string>
    }
    set headers(headers: Record<string, string>) {
        this._headers = headers
    }

    get locals(): Record<string,unknown> {
        return this._locals
    }
    set locals(locals: Record<string, unknown>) {
        this._locals = locals
    }
    
}

export class MicropResponse {

    body?:   Record<string, unknown> | Uint16Array | string | Buffer | undefined | null
    status?: number
    headers?:Record<string, string> | undefined
    locals?: Record<string, unknown> | undefined

/*     constructor( body?: Record<string, unknown> | Uint16Array | string | Buffer | undefined | null ) {
       
        
    } */
}

class Body {
    private chunk: Buffer
    constructor(chunk: Buffer) {
        this.chunk = chunk
    }


    json(): Promise<Record<string, unknown>> {

        return new Promise((resolve, reject) => {
            IsJson(this.chunk.toString()) ? resolve(JSON.parse((this.chunk  as unknown)as string)): reject()
        })
    }

    text(): Promise<string> {

        return new Promise((resolve)=> {
            resolve(this.chunk.toString())
        })
    }
    
}

export abstract class MicropCore extends EventEmitter {


    abstract get(path: string, middleware: typeof CreateMicropMiddleware, hook?: MicropHook , handler?: MicropHandler): this 
    abstract post(path: string, middleware: typeof CreateMicropMiddleware, hook?: MicropHook , handler?: MicropHandler): this 
    abstract put(path: string, middleware: typeof CreateMicropMiddleware, hook?: MicropHook , handler?: MicropHandler): this 
    abstract patch(path: string, middleware: typeof CreateMicropMiddleware, hook?: MicropHook , handler?: MicropHandler): this 
    abstract delete(path: string, middleware: typeof CreateMicropMiddleware, hook?: MicropHook , handler?: MicropHandler): this 
}

class MicropListener {
    
    stack: Array<MicropStack>= []
    constructor(stack:MicropStack[]) {
        this.stack = stack
        
    }

    async handle(req: IncomingMessage, res: ServerResponse) {

        if(req.method == undefined) {

            return res.end(400)
        }
        const method : string = req.method
        const stackItems =  this.stack.filter(item =>  item.compare(req.url as string, Methods[req.method as keyof typeof Methods ]))


        const request = new MicropRequest(req, res)
        request.cookies = (req.headers.cookie as unknown) as Record<string,string>
        request.headers = JSON.parse(JSON.stringify( req.headers   ))
        

               
        req.on("data", chunk =>  request.body = new Body(chunk) )
       
        req.on("end", async () => {
        
        for await(const item of stackItems) {
          
            if(typeof item.handlers == "function") {

                
                let response  = await item.handlers(request)
            
                Object.entries(response.headers as Record<string, string>).forEach(([key, value]: [string, string]) => {
                    res.setHeader(key, value)
                })
                if(response.body || response.status) {
                    
                    switch(typeof response.body) {

                        case "string": res.write(response.body)
                            break;
                        case "object": res.write(JSON.stringify(response.body))
                            break;
                        default :
                            
                            break;
                    }
                   
                    break;
                }
                else {  
                    Object.assign(request.locals, response.locals)
                }


            
            }

            else {

                for await (const handler of (item.handlers as Array<MicropHandler>)) {
                      
                    let response  = await handler(request)
                    Object.entries(response.headers as Record<string, string> || []).forEach(([key, value]: [string, string]) => {
                        res.setHeader(key, value)
                    })
                    if(response.body || response.status) {
                    
                        switch(typeof response.body) {

                            case "string": res.write(response.body)
                                break;
                            case "object": res.write(JSON.stringify(response.body))
                                break;
                            default :
                                
                                break;
                        }
                        break;
                    }
                    else {
                        Object.assign(request.locals, response.locals)
                    }
               
            
                    
                }
            }



        } 
        res.end()
        
            
        })

   
       
    }
}

enum StackType {
    Middleware,
    Handler
}
export class MicropStack {
    stackType: StackType = StackType.Handler
    method: Methods
    regexp: RegExp
    params: Record<string, undefined>
    handlers: MicropHandler[] | MicropHandler | CreateMicropMiddleware
    constructor(regexp: RegExp, method:Methods, params: Record<string, undefined>, handlers: CreateMicropMiddleware)
    constructor(regexp: RegExp, method:Methods, params: Record<string, undefined>, handlers: MicropHandler[])
    constructor(regexp: RegExp, method:Methods, params: Record<string, undefined>, handlers: MicropHandler) 
    constructor(regexp: RegExp, method:Methods, params: Record<string, undefined>, handlers: MicropHandler[] | MicropHandler |  CreateMicropMiddleware ) {
        this.method = method
        this.regexp = regexp
        this.params = params
        this.handlers = handlers
    }

    get StackType(): StackType {
        return this.stackType
    }

    set StackType(type: StackType) {
        this.stackType = type
    }
    public compare(url: string, method: Methods): boolean {
      
       
        return this.regexp.test(url) && this.method == method
    }


}


export class Microp extends MicropCore {

    readonly server: Server
    listener: MicropListener | undefined
    stack: Array<MicropStack> = []
    constructor() 
    constructor(server: Server)
    constructor(server?: Server) {
        super()
        this.server = server ? server : createServer()
        this.server.on("request", (req, res) => {
            this.listener = new MicropListener(this.stack)
            this.listener.handle(req,res)
        })
    }


    //#region get

    get(path: string, handlers: typeof CreateMicropMiddleware): this
    get(path: string, handlers: MicropHandler[]): this
    get(path: string, handlers: MicropHandler): this
    get(path: string, handlers:  MicropHandler[]  ): this
    get(path: string, handlers: MicropHandler ): this  
    get(path: string, handlers: MicropHandler[]| MicropHandler | typeof CreateMicropMiddleware   ): this {

        this.stack.push(createStackItem(Methods.GET, path,handlers))  
       
        return this
    }  
    //#endregion
        
    //#region post
   post(path: string, handlers: typeof CreateMicropMiddleware): this
   post(path: string, handlers: MicropHandler[]): this
   post(path: string, handlers: MicropHandler): this
   post(path: string, handlers: MicropHandler[]  ): this
   post(path: string, handlers: MicropHandler ): this  
   post(path: string, handlers: MicropHandler[] | MicropHandler | typeof CreateMicropMiddleware   ): this {
        
        this.stack.push(createStackItem(Methods.GET, path,handlers))  
        
        return this
    }  
    //#endregion

    //#region put
    put(path: string, handlers: typeof CreateMicropMiddleware): this
    put(path: string, handlers: MicropHandler[]): this
    put(path: string, handlers: MicropHandler): this
    put(path: string, handlers: MicropHandler[]): this
    put(path: string, handlers: MicropHandler ): this  
    put(path: string, handlers: MicropHandler[]| MicropHandler | typeof CreateMicropMiddleware   ): this {
           
        this.stack.push(createStackItem(Methods.GET, path,handlers))  
       
        return this
    }  

    //#endregion

    //#region patch
    patch(path: string, handlers: typeof CreateMicropMiddleware): this
    patch(path: string, handlers: MicropHandler[]): this
    patch(path: string, handlers: MicropHandler): this
    patch(path: string, handlers: MicropHandler[]  ): this
    patch(path: string, handlers: MicropHandler ): this  
    patch(path: string, handlers: MicropHandler[]| MicropHandler | typeof CreateMicropMiddleware   ): this {
         
            
        this.stack.push(createStackItem(Methods.GET, path,handlers))  
       
        return this
     }  
    //#endregion

     //#region delete
    delete(path: string, handlers: typeof CreateMicropMiddleware): this
    delete(path: string, handlers: MicropHandler[]): this
    delete(path: string, handlers: MicropHandler): this
    delete(path: string, handlers: MicropHandler[]  ): this
    delete(path: string, handlers: MicropHandler ): this  
    delete(path: string, handlers: MicropHandler[]| MicropHandler | typeof CreateMicropMiddleware   ): this {
        this.stack.push(createStackItem(Methods.GET, path,handlers))  
       
        return this
     }  
     //#endregion
    
    listen(port: number, callback?: () => void): this {
        this.server.listen(port, callback)
        return this
    }

}