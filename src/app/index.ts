import {  Server } from "http"
import { MicropBody } from "../body"
import { CookieParser, getParams, ParseQurtyString } from "../helpers"
import { 
    Core, 
    EMicropMethod, 
    IMicropRequest, 
    IMicropResponse, 
    IOriginalRequest, 
    IOriginalResponse, 
    IStackItem, 
    MicropHandler, 
    MicropMethod, 
    MicropMiddleware } from "../core/index"
import { CreateStackItem, registerMiddleware } from "../helpers"

/**
 * app interface'i cora'a http serveri implement ediyor
 * bu sekilde Microp classi server propertysi ve listen metoduna sahip 
 */
interface App {
    readonly server: Server
    listen: (port: number, callback?: ()=> void) => this
}

/**
 * @description #Nodejs'nin standart requestHandler'i icin handler fonksiyonu donuyor
 *              #OriginalRequest ve OriginalResponse interfaceleri IncomingMessage ve ServerResponseden kalitiyor 
 *              #bk. /core/index.ts
 * @param {IStackItem[]} stack = url ve method ile uyusan butun endpointler 
 * @returns {RequestHandler} - nodejs standart request handler
 */
const requestHandler = (stack: IStackItem[]) => 
    async (
        req:IOriginalRequest, 
        res:IOriginalResponse
    ) =>  {
        const requestUrl: string = req.url?.replace(/\?.*/g, "") || "";
     
       
        const stackForRequest: IStackItem[] = 
            stack.filter(s => s.regexpPath?.test(requestUrl) && s.method.test(req.method || ""))
        const request: IMicropRequest = {
            body: new MicropBody(req),
            cookies: CookieParser(req.headers.cookie || ""),
            headers: req.headers as Record<string,string>,
            params: {},
            query: ParseQurtyString(req.url || "", req.headers.host || ""),
            locals:  {}
        }

        let isBodySend:boolean = false;
        for (const handler of stackForRequest) {
            
            request.params = getParams(req.url || "", handler.params || {})

            if(handler.isMiddleware) {
                registerMiddleware(req,res,handler.handler as MicropMiddleware)
                request.locals = {...request.locals, ...req.locals as Record<string,unknown>}
                if(res.writableEnded) {
                    break;
                }
                else continue;
            }
            try {
                // status code veya body gonderilene kadar butun handlerlar sirasi ile calisiyor, 
                // donen locals objesi bir sonraki handlerin request objesindeki locals ile merge ediliyor
             
                const response: IMicropResponse = await (handler.handler as MicropHandler)(request)
                if(response.headers) {
                    Object.entries(response.headers).forEach( h => res.setHeader(h[0],h[1]))
                }
                if(response.cookies !== undefined) {
                    res.setHeader("set-cookie", response.cookies)
                }
                if(response == undefined) continue;
                isBodySend = response.body !== undefined || response.status !== undefined
                // donen locals objesi bir sonraki handlerin request objesindeki locals ile merge ediliyor
                request.locals = {...request.locals, ...response.locals as Record<string,unknown>}
                if(!isBodySend) continue;
                else { 
                    res.statusCode = response.status ? response.status : 200
                    res.end(response.body)
                    break
                } 
            } catch { res.statusCode = 500; res.end(); break;}
           
    }
   
}

/**
 * @description  
 */
export class Microp extends Core implements App {
    use(handler: MicropMiddleware | MicropHandler | MicropRouter): this
    use(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this
    use(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    use(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    use(path: unknown, handler?: unknown): this {
        this.stack = [...this.stack, ...CreateStackItem( MicropMethod[EMicropMethod.USE], path, handler)]
        return this
    }
    get(handler: MicropMiddleware | MicropHandler | MicropRouter): this
    get(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this
    get(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    get(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    get(path: unknown, handler?: unknown): this {
        this.stack = [...this.stack, ...CreateStackItem( MicropMethod[EMicropMethod.GET], path, handler)]
        return this
    }
    post(handler: MicropMiddleware | MicropHandler | MicropRouter): this
    post(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this
    post(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    post(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    post(path: unknown, handler?: unknown): this {
        this.stack = [...this.stack, ...CreateStackItem( MicropMethod[EMicropMethod.POST], path, handler)]
        return this
    }
    put(handler: MicropMiddleware | MicropHandler | MicropRouter): this
    put(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this
    put(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    put(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    put(path: unknown, handler?: unknown): this {
        this.stack = [...this.stack, ...CreateStackItem( MicropMethod[EMicropMethod.PUT], path, handler)]
        return this
    }
    patch(handler: MicropMiddleware | MicropHandler | MicropRouter): this
    patch(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this
    patch(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    patch(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    patch(path: unknown, handler?: unknown): this {
        this.stack = [...this.stack, ...CreateStackItem( MicropMethod[EMicropMethod.PATCH], path, handler)]
        return this
    }
    delete(handler: MicropMiddleware | MicropHandler | MicropRouter): this
    delete(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this
    delete(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    delete(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    delete(path: unknown, handler?: unknown): this {
        this.stack = [...this.stack, ...CreateStackItem( MicropMethod[EMicropMethod.DELETE], path, handler)]
        return this
    }
    head(handler: MicropMiddleware | MicropHandler | MicropRouter): this
    head(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this
    head(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    head(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    head(path: unknown, handler?: unknown): this {
        this.stack = [...this.stack, ...CreateStackItem( MicropMethod[EMicropMethod.HEAD], path, handler)]
        return this
    }
    option(handler: MicropMiddleware | MicropHandler | MicropRouter): this
    option(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this
    option(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    option(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    option(path: unknown, handler?: unknown): this {
        this.stack = [...this.stack, ...CreateStackItem( MicropMethod[EMicropMethod.OPTIONS], path, handler)]
        return this
    }
   
 
    readonly server: Server = new Server()
    listen(port?: number, callback?: (() => void) | undefined): this {
        this.server.listen(port, callback)
        this.server.on("request", requestHandler(this.stack))
        return this
    }

}

export class MicropRouter extends Core {



    use(handler: MicropMiddleware | MicropHandler | MicropRouter): this
    use(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this
    use(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    use(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    use(path: unknown, handler?: unknown): this {
          this.stack = [...this.stack, ...CreateStackItem(MicropMethod[EMicropMethod.USE],path, handler)]
      
       return this
    }


    get(handler: MicropHandler): this;
    get(path: string, handler: MicropHandler): this;
    get(handler: MicropHandler[]): this;
    get(path: string, handler: MicropHandler[]): this;
    get(path: string | MicropHandler | MicropHandler[], handler?: MicropHandler | MicropHandler[] ): this {
       this.stack = [...this.stack, ...CreateStackItem(MicropMethod[EMicropMethod.GET],path, handler)]
      
       return this
    }

    post(handler: MicropMiddleware | MicropHandler | MicropRouter): this
    post(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this
    post(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    post(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    post(path: unknown, handler?: unknown): this {
        this.stack = [...this.stack, ...CreateStackItem(MicropMethod[EMicropMethod.POST],path, handler)]
      
        return this
    }
    put(handler: MicropMiddleware | MicropHandler | MicropRouter): this
    put(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this
    put(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    put(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    put(path: unknown, handler?: unknown): this {
        this.stack = [...this.stack, ...CreateStackItem(MicropMethod[EMicropMethod.PUT],path, handler)]
      
        return this
    }
    patch(handler: MicropMiddleware | MicropHandler | MicropRouter): this
    patch(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this
    patch(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    patch(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    patch(path: unknown, handler?: unknown): this {
        this.stack = [...this.stack, ...CreateStackItem(MicropMethod[EMicropMethod.PATCH],path, handler)]
      
        return this
    }
    delete(handler: MicropMiddleware | MicropHandler | MicropRouter): this
    delete(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this
    delete(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    delete(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    delete(path: unknown, handler?: unknown): this {
        this.stack = [...this.stack, ...CreateStackItem(MicropMethod[EMicropMethod.DELETE],path, handler)]
      
        return this
    }
    head(handler: MicropMiddleware | MicropHandler | MicropRouter): this
    head(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this
    head(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    head(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    head(path: unknown, handler?: unknown): this {
        this.stack = [...this.stack, ...CreateStackItem(MicropMethod[EMicropMethod.HEAD],path, handler)]
      
        return this
    }
    option(handler: MicropMiddleware | MicropHandler | MicropRouter): this
    option(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this
    option(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    option(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this
    option(path: unknown, handler?: unknown): this {
        this.stack = [...this.stack, ...CreateStackItem(MicropMethod[EMicropMethod.OPTIONS],path, handler)]
      
        return this
    }
  
 

}
