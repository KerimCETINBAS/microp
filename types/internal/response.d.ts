/// <reference types="@types/node" />
/// <reference types="@types/node" />
import { ServerResponse } from "http";
export interface IMicropResponse {
    body?: string | boolean | undefined | Uint8Array | Buffer;
    headers?: Record<string, string>;
    status?: number;
    locals?: Record<string, unknown>;
    nextHandler?: boolean;
    sendResponse?: boolean;
}
export interface IMicropOriginalResponse extends ServerResponse {
    [key: string]: any;
}
export declare class MicropResponse_ implements IMicropResponse {
    body?: string | boolean | Uint8Array | Buffer | undefined;
    headers?: Record<string, string>;
    status?: number;
    locals?: Record<string, unknown>;
    sendResponse?: boolean;
    nextHandler: boolean;
    constructor(response: IMicropResponse);
    get IsBodySent(): boolean;
}
export declare function MicropResponse(init?: {
    status?: number;
    headers?: Record<string, string>;
}): {
    Json: (jsonBody: Record<string, unknown>) => MicropResponse_;
    Bool: (booleanBody: boolean) => MicropResponse_;
    Text: (textBody: string) => MicropResponse_;
    Buffer: (bufferBody: Buffer) => MicropResponse_;
    Empty: () => MicropResponse_;
    NextHandler: (locals: Record<string, unknown>) => MicropResponse_;
};
//# sourceMappingURL=response.d.ts.map