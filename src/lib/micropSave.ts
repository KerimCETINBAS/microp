


import { copyFileSync, stat } from "fs"
import { createServer, IncomingMessage, Server, ServerResponse, request, IncomingHttpHeaders } from "http"
import { Socket } from "net"
import { resolve } from "path"

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
    
    handler: (request: IRequest) => IResponse 
}

export interface IEndpointStack {
    regexp?: RegExp
    path: string
    method: Methods
    params: Record<string, string | number | undefined>
    handler: (request: IRequest) => IResponse 
}
export interface IServiceOptions {
        
}


class CreateRequest  {
    
    private _originalRequest: IncomingMessage
    body: any 

    
    constructor(req: IncomingMessage) {
     
       this._originalRequest = req

    }


   
    
}

class CreateService {

    private server: Server
    private middleWareStack: Array<(req:any, res: any, next: any)=>void> = []
    private endpoints: IEndpointStack[] = []

    
    constructor(options?: IServiceOptions) {

        this.server = createServer(async (req: IncomingMessage , res) => {

            const r = new CreateRequest(req)

        
            let _next = false
            const url = new URL(req.url || "/",  `http://${req.headers.host}`)
            const params = {}
            let _body = {}
            
            
            const endpoint = this.endpoints.find(ep => ep.regexp?.test(url.pathname) && ep.method == req.method)


        
            if(!endpoint) {
                res.statusCode = 404
                res.end()
                return
            }

            const segments = url.pathname.split("/").filter(p=> p !== "")
            
            Object.entries(endpoint.params).forEach(param=> {
                    Object.assign(params, { [param[0]] : segments[param[1] as number] })
            });
            
        
            
            for await (const middleware of this.middleWareStack)
            {
              
                _next = false

                function next(error?: any) {
                    
                    if(error)
                         ((req as unknown) as IRequest).error = error
                    req.emit("next")
                   
                }
                middleware(req, res, next)

                req.on("next", ()=> {
                    _next = true
                })


                if(_next) continue;
                
                else {
                    console.log("no call")
                    return res.end()
                }
              

               
               
               
            }
        
            

            req.once("end", () => {
                
                console.log("body :", ((req as unknown) as IRequest).body)
                const { body , status, headers } = 
                    endpoint.handler({
                        body: _body, 
                        headers: req.headers as Record<string,string>,
                        params: params,
                        queryParams: url.searchParams})



                status ?  res.statusCode = status :  res.statusCode = 200
                
                if(headers) Object.entries(headers).forEach(header => res.setHeader(header[0], header[1]))
                
                
                if(body) {
 
                    switch (typeof body) {
                        case "object":
                            console.log(res.destroyed)
                            res.end(JSON.stringify(body))
                            break;
                        
                    
                        default:
                          
                            res.end(body)
                            break;
                    }
                }
            })
        

            
        })
    }
    
  
    useMiddleware(middleware: (_req:IncomingMessage, _res:ServerResponse, next: (error?: any) => void)=>void): this {

        
        this.middleWareStack.push(middleware)
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

        console.log(this.endpoints)
        return this
    }

    listen(port: number, callback: () => void) : this {
        
        this.server.listen(port, ()=> callback())

        return this
    }
}


export {
    CreateService
}
