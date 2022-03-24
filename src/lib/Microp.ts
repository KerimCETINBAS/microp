


import EventEmitter from "events"
import { createServer, IncomingMessage, Server, ServerResponse } from "http"


export enum Methods {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Patch = "PATCH",
    Delete = "DELETE"
}


export interface IRequest  {
    error?: any
    body?: undefined | string | Uint16Array | Record<string,unknown>
    headers:Record<string,string>,
    queryParams: URLSearchParams
    params: Record<string, string | number> | undefined
    cookies:Record<string, string> | undefined
    [key:string]: unknown
}
export interface IResponse {
    status?: number
    body?:  Record<string,unknown> | string | number | Array<unknown> | Uint16Array | undefined,
    headers?: Record<string,string>
    
} 
export interface IEndpoint {
    regexp?: RegExp
    path: string
    method: Methods
    hooks?: Array< (request: IRequest) => Record<string, unknown> | void>
    handler: (request: IRequest) => IResponse 
}

export interface IEndpointStack {
    regexp?: RegExp
    path: string
    method: Methods
    params: Record<string, string | number | undefined>
    hooks?: Array< (request: IRequest) => Record<string, unknown> | void>
    handler: (request: IRequest) => IResponse 
}


class HTTPError extends Error {
    status: number
    constructor({status, message}: {
        status: number,
        message: string
    }) {
        super(message)
        this.status = status
    }
}

class CreateRequest extends EventEmitter {
    private _originalRequest: IncomingMessage
    rawBody: any 
    body?: Record<string, unknown> | Uint16Array | Buffer | string | undefined
    headers: any
    isDestroyed: boolean = false
    error?: any
    locals: Record<string, unknown> = {}
    params:Record<string, string | number | undefined> = {}
    constructor(req: IncomingMessage,res: ServerResponse, middlewares?: Array<(req: IncomingMessage, res: ServerResponse, next?: (err?:any)=>void)=>void>) {
       super()
       this._originalRequest = req
       let next = true
       let local = {}
       if(!!middlewares?.length) {
           
            for(const middleware of middlewares) {
                next = false
                const locals = middleware( this._originalRequest,res, err => {
                   next = true
                })

                Object.assign(this.locals, locals)
            }
            if(!next) {
               res.end()
            }
       }
       this._originalRequest.on("data" , chunk => this.rawBody = chunk)
       this._originalRequest.once("end", ()=> {
            this.body = ( <IRequest>(<unknown>this._originalRequest)).body
            this.emit("end", this)
       })

    }
    
}




class CreateService {
    readonly server: Server =  createServer()
    private middlewares: Array<(
        req: IncomingMessage, 
        res: ServerResponse, 
        next?: (error?: any)=>void)=>void> = []
    private endpoints: IEndpointStack[] = []
  
    constructor() {
        
        this.server.on("request" , (req, res) => {
            const url = new URL(req.url || "/",  `http://${req.headers.host}`)
            const endpoint = this.endpoints.find(ep => ep.regexp?.test(url.pathname) && ep.method == req.method)
            
            if(!endpoint) {
               
               
                res.setHeader("content-type", "text/html")
                res.end(`   <!DOCTYPE html>
                            <html lang="en">
                            <head>
                            <meta charset="utf-8">
                            <title>Error</title>
                            </head>
                            <body>
                            <pre>Cannot ${req.method} ${url.pathname}</pre>
                            </body>
                            </html> `)
                return 
            }
       
            const request = new CreateRequest(req, res, this.middlewares)

            // get params
            const segments = url.pathname.split("/").filter(p=> p !== "")
            Object.entries(endpoint.params).forEach(param=> {
                Object.assign(request.params, { [param[0]] : segments[param[1] as number] })
            });
            
            request.on("end", (request)=> { 
                const endPointRequest = {
                    body: request.body,
                    headers: request.headers,
                    locals: request.locals,
                    cookies: request.cookies,
                    queryParams: request.queeryParams,
                    params: request.params
                }
                let hookResult: Record<string, unknown> = {}
                if(endpoint.hooks) {
                    try {   endpoint.hooks.forEach(hook => {
                                Object.assign(hookResult, hook(endPointRequest))   })
                
                    } catch (error) { return res.end(String(error))  }
                }
                Object.assign(endPointRequest, hookResult)
                const response = endpoint.handler({...endPointRequest})
                response.status ? 
                    res.statusCode = response.status :
                    response.status = 404;
          
                if(response.headers) {
                    Object.entries( response.headers).forEach(header => {
                        res.setHeader(header[0], header[1])
                    })
                }
                if(response.body) {
                    switch(typeof response.body) {
                        case "object" :
                            res.write(JSON.stringify(response.body))
                            break;
                        default :
                            res.write(response.body)
                    }
                }
                res.end()
            })
        })
    }
    use(
        middleware: (req: IncomingMessage, res: ServerResponse, next?: (err? : any) => void) => void | any
    ):this {
        this.middlewares?.push(middleware)
        return this
    }

    
    addEndpoint(endpoint: IEndpoint): this {
        const regexp = new RegExp("^"+endpoint.path.replace(/:\w+/g, "\\w+") + "\/?$")
        const segments = endpoint.path.trim().split("/").filter(t => t != "")
        const params = segments.map((segment, index)=> {

            const isRegexp = /^:\w+$/.test(segment)
            
            return {
                isRegexp,
                index,
                param: segment.replace(":","")
            }
            
        }).filter(s => s.isRegexp).reduce((a:any, v) => {
            a[v.param] = v.index

            return a
        }, {}) as Record<string, undefined>
        
        
        this.endpoints.push({
            ...endpoint,
            params,
            regexp

        })
        return this
    }
    listen(port: number, callback?: ()=> void) : this {

        this.server.listen(port)
        if(callback) callback()
        return this
    }
}
export {
    CreateService, HTTPError
}
