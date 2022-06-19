
import { EventEmitter } from "events"
import {  IncomingMessage, ServerResponse } from "http"
import type { Server } from "http"
import type {MicroRequest, MicroResponse, MicroHook, MicroHandleFunc, MicroHandler} from "../types"

const parseUrl = (path:string) => {
   
}

export enum Methods  {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE',
    Options = 'OPTIONS',
    Head = 'HEAD'
}
const createMicroRequest = async (
            req: MicroRequest, 
            res: ServerResponse, 
            middleWareStacks: Array<(req:IncomingMessage,res:ServerResponse,next:(error?:string) =>void)=>void>, 
            callback?:(request: MicroRequest)=>void): Promise<MicroRequest> => {
        let currentMiddleWare = 0
        req.on("data", (chunk: any)=>{
            req.rawBody=chunk
        })

        let next = (params:any) => {
            currentMiddleWare++

            if(middleWareStacks.length  > currentMiddleWare) {
                middleWareStacks[currentMiddleWare](req,res,next)
            }
        }
        middleWareStacks.length > 0 ?  middleWareStacks[currentMiddleWare](req as MicroRequest,res,next): null
        return await new Promise((resolve)=> {
            req.on("end" , () => { callback ? callback(req) :  null;  return resolve(req as MicroRequest);  })
        })
}

export function useRegex(regexp:RegExp) {
    
}

export function  createHandlerUrl(path:string) {
  
    const urlSection =  path.split(/\//).filter(n => n)
    let params: { isParam: boolean; index: number; param: RegExpMatchArray | null; section: string }[] = []
    urlSection.forEach((section, index) => {
        const isParam = /(?<=:)(\w*)(?=$)/.test(section)
        const param = section.match(/(?<=:)(\w*)(?=$)/)
        params.push({
            isParam,
            index,
            param,
            section
        })
    })
    let reducedParam = params.reduce((start, current)=>{

        let isRegExp = current.isParam
        start += isRegExp ? "\\w+" : current.section
        return start + "\/?"
    },"")

    const regexUrl = new RegExp(`^\/${reducedParam}$`)
    
   
    return {
        regexUrl,
        params
    }
  
}

export class MicroError{ 

    constructor(public status: number, public message: string) {}
}

function compareUrl(url: string,method: any, {handler,  regexUrl}: any) {
    /** strip query params */
    url = url.replace(/(\/\?.*|\?.*)$/, "")

    /** if requested method is not handler method skip */
    if(method !== handler.method) return false

     /** if requested is not handler url skip */
    else if(!regexUrl.regexUrl.test(url)) return false
    
    /** get parameters */
    const params = url.split(/\//g).filter(n=>n).map((param, index) => {
        
        const _param = regexUrl.params.find(param => param.index == index)
        return _param.isParam ? {[_param.param[0]]:param} : false
    }).filter(n=>n).reduce(function(result, item) {
        /** convert param array to object */
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {})
    
    return {
        handler,
        params
    }
   
}

export async function serverHandler(request, res: ServerResponse, microHandlerStack) {

   
    for (const stackItem of microHandlerStack) {
        try {
            const isRoute = compareUrl(request.url, request.method , stackItem)
        
            if(!isRoute) continue

            const {handler, params} = isRoute
            
            request.params = params
            
            handler.hooks.forEach((hook: MicroHook) => {
                request.locals = { ...request.locals , ...hook(request)}
            })
            

            const {body, headers} = handler.handler(request)
            
            headers ? Object.entries(headers).forEach(header=>{
                res.setHeader(header[0], String(header[1]))
            }) : null
            res.end(body ? JSON.stringify(body) : null)
            
            break
        } catch (error) {
            res.statusCode = error.status
            res.end(error.message)
            break
        }   
     

    }
}

export class Microp extends EventEmitter{
    private middleWareStacks = []
    private microHandlerStack = []
    constructor(private server: Server) {
        super()
        // forvard server events
        this.server.on("listening", ()=> this.emit("listening"))
        this.server.on("upgrade", (req: IncomingMessage, socket: internal.Duplex, head: Buffer) =>  this.emit("upgrade",req, socket, head))
        this.server.on("error", (err:Error)=> this.emit("error", err))
        this.server.on("connect", (req: IncomingMessage, socket: internal.Duplex, head: Buffer) => this.emit("connect", req, socket, head))
        this.server.on("clientError", (err:Error, socket:internal.Duplex) => this.emit("clientError", err, socket))
        this.server.on("checkExpectation", (req: IncomingMessage, res: ServerResponse)=> this.emit("checkExpection", req, res))
        this.server.on("checkContinue", (req: IncomingMessage, res: ServerResponse)=> this.emit("checkContinue", req, res))
        this.server.on("request", async (req,res) => {  
            this.emit("request", req, res)
            const request = (await createMicroRequest(req as MicroRequest,res, this.middleWareStacks))
            await serverHandler(request, res, this.microHandlerStack)
       })

         // make a request

    }
    
    handle(handler:MicroHandler /** todo create microResponse */): void {

        this.microHandlerStack.push({handler, regexUrl: createHandlerUrl(handler.path)})
    }

    useMiddleware(useMiddleware: Array<(req,res,next)=>void>) {
            this.middleWareStacks = useMiddleware
    }

    get HandlerStack () {
        return this.microHandlerStack
    }
  
}


