import { MicropRequest } from "../microp/request"

export type VoidNoParamCallback = () => any
export type  MicropHandler = (request: MicropRequest) => IMicropResponse



export enum Methods {
    ANY = "*",
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS" 
}

export interface IMicropResponse {
    status?: number 
    header?:Record<string,string>
    locals?:Record<string,unknown>
    body?: string | Record<string,unknown> | Uint16Array | Buffer
    
}

