import { IncomingMessage,  ServerResponse } from "http"
import { MicropRouter } from "../app"
import { EMicropMethod, IOriginalRequest, IOriginalResponse, IStackItem , MicropHandler, MicropMethod, MicropMiddleware} from "../core"
import { parse } from "querystring"
import { buffer } from "stream/consumers"
//Her handler tipinin stakIteme cevirilmesi farkli sekilde oluyor
enum HandlerType {
    Function = 0,
    Router,
    Middleware,
    Array
}
//#region CreateRegexpUrl
    /**
     * @description #url yi alip istek geldiginde Endpoint path'i ile karsilastirabilmek icin regexpe ceviriyor
     *              #path undefined ise butun url ler ile eslestiriyor
     *              #"/user" =>  /^\/user$/ 
     * @param {string | undefined} path
     * @returns {RegExp} 
     */
    const CreateRegexpurl = (path?: string) : RegExp =>  {
        if(path) {
        return new RegExp("^"+path.replace(/:\w+/g, "\\w+") + "$")
        }
        return new RegExp(".*")
    }
//#endregion

//#region createParams
    /**
     * @description #Endpoint pathindan parametre yaratiyor 
     *              #"/user/:id" => { id: ... }
     * @param {string|undefined} path  
     * @returns {Record<string,string>}
     */
    const createParams = (path: string) => {
        
        const segments = path.split("/").filter(s => s !== "").reduce((t,c,i)=> {
            if(/^:/.test(c)) return {...t, [c.replace(/^:/,"")]: i}
            return t  }, {})
        return segments
    }
//#endregion

//#region  CreateStackitem
    export const CreateStackItem = (method: RegExp,path: unknown, handler: unknown) : IStackItem[] => {

        let stack: IStackItem[] = []
        if(typeof path == "string") stack = [...stack, ...CreateStackWithPath(method,path, handler)]
        else stack = [...stack, ...CreateStackWithoutPath(method,path) as IStackItem[]]

     
        return stack
    }

    /**
     * @description #Endpointteki stack tipini bulur ve doner, 
     *              #Express stili Middleware ve MicropHandler context yapisi farkli oldugundan
     *              #farkli bir sekilde islenmesi gerekiyor
     *              #request => response /=/ MicropHandler
     *              #(request,response,next?) => void /=/ MicropMiddleware = expres sitili handler
     * @param {Function<MicropHandler> | MicropRouter | MicropMiddleware}handler 
     * @returns {HandlerType}
     */
    const GetTypeofHandler = (handler: unknown): HandlerType => {
        if( typeof handler == "function") return HandlerType.Function
        else if( handler instanceof MicropRouter) return HandlerType.Router // router
        else if( handler instanceof MicropMiddleware) return HandlerType.Middleware
        else return HandlerType.Array// array
    }

    /**
     * @description 
     *      # path gonderildigi icin path icin ozel regexpUrl uretilir 
     *      # /user/profile/:id => /^\/user\/profile\/\w+/ ve stack'a bu sekilde eklenir
     * @param { RegExp } method => /^GET$/i , /^POST$/i ..vs 
     * @param { string } path 
     * @param { 
     *      MicropHandler    | 
     *      MicropRouter     | 
     *      MicropMiddleware | 
     *      (MicropHandler   | MicropRouter | MicropMiddleware)[]} handler 
     * @returns {IStackItem[]}
     */
    const CreateStackWithPath = (method:RegExp,path: string, handler: unknown ): IStackItem[] => {
        const handlerType = GetTypeofHandler(handler)
        switch(handlerType) {
            case HandlerType.Function:
                return [{path, regexpPath:CreateRegexpurl(path), handler: handler as MicropHandler, params: createParams(path), method, isMiddleware: false}]
            case HandlerType.Router:
                return CreateStackFromRouter(method, path, handler as MicropRouter)
            case HandlerType.Middleware:
                return [{path, regexpPath:CreateRegexpurl(path), handler: handler as MicropMiddleware, params: createParams(path), method, isMiddleware: true}]
            default:
                let arrayStack: IStackItem[] = []
                for(const h of (handler as (MicropMiddleware | MicropHandler | MicropRouter)[])) {
                  
                    arrayStack = [...arrayStack,...CreateStackItem(method, path, h)]
                }
                return arrayStack
        }
    }
    /**
     * @description Path olmadigi icin genel regexp uretilir => /.+/
     * @param { RegExp } method => /^GET$/i , /^POST$/i ..vs 
     * @param { 
     *      MicropHandler    | 
     *      MicropRouter     | 
     *      MicropMiddleware | 
     *      (MicropHandler   | MicropRouter | MicropMiddleware)[]} handler 
     * @returns 
     */
    const CreateStackWithoutPath = (method:RegExp,handler: unknown): IStackItem[] => {
        const handlerType = GetTypeofHandler(handler)
        switch(handlerType) {
            case HandlerType.Function:
                return [{path: "", regexpPath:CreateRegexpurl(""), handler: handler as MicropHandler, params: createParams(""), method, isMiddleware: false}]
            case HandlerType.Router:
                return CreateStackFromRouter(method, "", handler as MicropRouter)
            case HandlerType.Middleware:
                return [{path: "", regexpPath:CreateRegexpurl(""), handler: handler as MicropMiddleware, params: createParams(""), method, isMiddleware: true}]
            default:
                for(const h of (handler as (MicropMiddleware | MicropHandler | MicropRouter)[])) {
                    return [...CreateStackItem(method, "", h)]
                }
                break;
        }
        return []
    }
    const CreateStackFromRouter = (method:RegExp, path: string, router: MicropRouter) : IStackItem[] => {
        let stack: IStackItem[] = []
        for(const stackItem of router.Stack) {
            if( method != MicropMethod[EMicropMethod.USE])  break;
            const derivedPath:string = (path + stackItem.path).replace(/\/$/, "")
            const params: Record<string,string> = createParams(derivedPath)
            stack = [...stack, {params,path:derivedPath, regexpPath:CreateRegexpurl(derivedPath), handler: stackItem.handler as MicropMiddleware, method:stackItem.method, isMiddleware: stackItem.isMiddleware}]
        }
        return stack
    }

//#region 

/**
 * @description Middleware tipindeki handleri requestHandlerin icine cagiriyor
 * @param {IOriginalRequest} req 
 * @param {IOriginalResponse} res 
 * @param middleware MiddlewareFunction
 * @returns {req: IOriginalRequest, res:IOriginalResponse}
 */
export const registerMiddleware = 
    async (
        req: IncomingMessage,
        res: ServerResponse, 
        middleware: MicropMiddleware
    ) : Promise<{ req: IncomingMessage, res: ServerResponse}> => {
    let isNextCalled = false
    const next = (err?:unknown) => {

            if(err) throw new Error("todo: Implement Error handling method")
            isNextCalled = true
    }   
    
    await middleware.middleWareFunc(req as IOriginalRequest,res as IOriginalResponse,next)

    return {
        req, res
    } 
  
}


//test=123123; test2=sadasd
//["test=123123", "test2=sadasd"]
//[["test", "123123"], ["test", "123123"]]
export interface ICookieOptions {
    Expires?: Date
    MaxAge?: number
    Domain?: string
    Path?: string
    Secure?: boolean
    HttpOnly?: boolean
    SameSite?:"Strict" | "Lax" | "None"
}

export const CookieParser = (cookieHeader: string): Record<string,string> => 
    cookieHeader.split(";").map(c => c.split("=")).reduce((t: {},c)=>({...t, [c[0].trim()]:c[1]}),{})


export const SetCookie = (name:string, value:string, options: ICookieOptions): string => {
    let cookieOptions: string = ""
    Object.entries(options).forEach( option => {
        switch(option[0]) {
            case "Expires":
                cookieOptions += `Expires=${option[1]};`
                break;
            case "MaxAge":
                cookieOptions += `Max-Age=${option[1]};`
                break;
            case "Domain":
                cookieOptions += `Domain=${option[1]};`
                break
            case "Path":
                cookieOptions += `Path=${option[1]};`
                break
            case "Secure":
                cookieOptions += `${option[1] ? "Secure;" : ""}`
                break
            case "HttpOnly":
                cookieOptions += `${option[1] ? "HttpOnly;" : ""}`
                break
            case "SameSite":
                cookieOptions += `SameSite=${option[1]};`
                break;
        }
    })
    return `${name}=${value}; ${cookieOptions}`
}


export const getParams = (url:string, params:Record<string,string>): Record<string,string> => {

    let param: any[] = url.replace(/\/?\?.*/g,"").split("/")

        param.shift()
        return  Object.entries(params).map(( p: [string, string]) => {
            
            return { [p[0]] : param[Number(p[1])] }
        }).reduce((t: Record<string,string>, c: Record<string,string>) => ({...t, ...c}) , {})
}

export const ParseQurtyString = (str: string, host: string): Record<string,string[] | string> => parse(str.replace(/^.*\?/, "")) as Record<string,string|string[]>

export const ResponseBodyParser = (body: unknown): unknown => {
    if(body instanceof Buffer)
        return body
    else if (typeof body == "object")
        return JSON.stringify(body, null, 2)
    else if(typeof body == "string")
        return body

    
   
}