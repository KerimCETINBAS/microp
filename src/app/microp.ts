import { IncomingMessage, Server, ServerResponse } from "http";
import { isTypedArray } from "util/types";
import Core = require("../core/core");
import { MicropBody } from "../core/micropBody";
import { MicropMiddleware } from "./middleware";
import { parse } from "querystring"
export interface MicropResponse {
    body?: Record<string, unknown> | string | Uint16Array | Buffer
    headers?: Record<string,string>
    locals?: Record<string,unknown>
    status?: number
}
const services = { get: (serviceName: string) => {} }
export interface MicropRequest {
    body: () => Promise< Record<string, unknown>  | string | Uint16Array | Buffer>
    params: Record<string, unknown>
    locals: Record<string, unknown>
    headers?: Record<string,string>
    cookies?: Record<string,string>
    query?: Record<string,string>
    get?: typeof services 
}
export type MicropHandler = (request: any) => MicropResponse
export interface MicropOriginalRequest extends IncomingMessage { [key : string]: unknown}
export interface MicropOriginalResponse extends ServerResponse { [key : string]: unknown}
export class Microp  extends Core.MicropCore {
    private server: Server = new Server()
    constructor() {
        super()
        this.server.on("request", async (req: MicropOriginalRequest, res: MicropOriginalResponse ) => {

            const _body = new MicropBody(req)

            const body = (): Promise<Record<string,string>  | string | Uint16Array | Buffer> => new Promise((resolve)=>{
                resolve(_body.form())
            })
            const url = (req.url?.replace(/\?.*$/,'') || "/").trim(),  request: MicropRequest = {
                body: body,
                params: {},
                locals: {},
                query:  parse((req.url || "").match(/(?<=\?)(.*)(?=$)/)?.[0] || "") as Record<string, string>
            }
            let _next = false
            for await (const stack of this._stack) {
                const isHit: boolean = stack.regexp.test(url) 
                if(isHit &&  (stack.method == Core.Methods.ALL || stack.method == req.method  )) {
                    // replace params with actual values
                    const segments = url.split("/").filter(s => s)

                    request.params = Object.entries(stack.params).map(([index, param]: [string, unknown] )=> ({[index]: param})).reduce((t: Record<string, unknown>,c)=>{
                           
                            const p = Object.entries(c)[0]
                             return {...t, [(p[0] as unknown) as string]: segments[(p[1] as unknown) as number]}
                    },{})
                    for await (const handler of stack.handlers) {
                        if(handler instanceof MicropMiddleware) {
                            handler.handler(req,res, next => { 
                                _next = true
                                if(res.writableEnded) return new Error("Cannot call next() after response is send")
                            })
                            if(!_next || res.writableEnded) return
                        }
                        else {
                            const response: MicropResponse = await handler(request)
                            if(response?.status) res.statusCode = response.status 
                            Object.entries(response?.headers || {}).forEach(([index, key]: [string, string]) => { 
                                res.setHeader(index, key) })
                            if(!response?.body && !response?.status ) {
                                Object.assign(request.locals, response?.locals || {})
                             
                            }
                            else {
                                res.statusCode = response?.status || 200
                                if(typeof response?.body == "string")  res.end(response.body)
                                else if(Buffer.isBuffer(response?.body)) res.end(response.body)
                                else if(isTypedArray(response?.body)) res.end(response.body)
                                else if(!response?.body) res.end()
                                else res.end(JSON.stringify(response.body))
                                return;
                            }
                        }
                    }
                }
            }
            if(!res.writableEnded) {
                res.setHeader("content-type", "text/html")
                res.end(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="utf-8">
                <title>Error</title>
                </head>
                <body>
                <pre>Cannot ${req.method} ${req.url}</pre>
                </body>
                </html>
                `)
            }
        })
    }
    listen(port: number, callback?:()=>void): this {

        this.server.listen(port, callback)
        return this
    }
}  