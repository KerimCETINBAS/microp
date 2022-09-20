import { ServerResponse } from "http";

export interface IMicropResponse { 
    body?: string | boolean | undefined | Uint8Array | Buffer
    headers?: Record<string, string>
    status?: number
    locals?: Record<string, unknown>
    nextHandler?: boolean
    sendResponse?: boolean 
 }

export interface IMicropOriginalResponse extends ServerResponse  { 
    [key:string]: any
}

export class MicropResponse_ implements IMicropResponse {
    body?: string | boolean | Uint8Array | Buffer | undefined;
    headers?: Record<string, string>
    status?: number
    locals?: Record<string, unknown>
    sendResponse?: boolean = false
    nextHandler: boolean = false
    constructor(response: IMicropResponse) {
        this.body = response?.body
        this.headers = response?.headers
        this.status = response?.status
        this.locals = response?.locals
        this.sendResponse = response?.sendResponse
        this.nextHandler= response?.nextHandler || false
    }


    get IsBodySent(): boolean { return !!this.body }
}



export function MicropResponse( init?: { status?:number, headers?: Record<string,string>} ) {
    return {
        Json:  (jsonBody: Record<string, unknown>) => new MicropResponse_({ body: JSON.stringify(jsonBody), status: init?.status , headers:init?.headers, sendResponse: true}),
        Bool:  (booleanBody: boolean) => new MicropResponse_({ body: booleanBody, status: init?.status, headers:init?.headers, sendResponse: true }),
        Text:  (textBody: string) => new MicropResponse_({ body: textBody,status: init?.status, headers:init?.headers, sendResponse: true }),
        Buffer: (bufferBody: Buffer) => new MicropResponse_({ body: bufferBody, status: init?.status, headers: init?.headers, sendResponse: true }),
        Empty: () => new MicropResponse_({status: init?.status, headers:init?.headers, sendResponse:false, nextHandler: false}),
        NextHandler: (locals: Record<string,unknown>) => new MicropResponse_({status: init?.status, headers:init?.headers, nextHandler: true})
    }
}


