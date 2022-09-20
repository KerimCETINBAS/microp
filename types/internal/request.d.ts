/// <reference types="@types/node" />
import { IncomingHttpHeaders, IncomingMessage } from "http";
import { MicropBody } from "./body";
import { IMicropOriginalResponse } from "./response";
import { MicropStackType } from "./stack";
export declare class MicropRequest {
    path: string;
    headers: IncomingHttpHeaders;
    params: Record<string, string>;
    locals: Record<string, unknown>;
    body: MicropBody;
    constructor(path: string, headers: IncomingHttpHeaders, params: Record<string, string>, locals: Record<string, unknown>, body: MicropBody);
}
export interface IMicropOriginalRequest extends IncomingMessage {
    [key: string]: any;
}
export declare const CompansateRequest: (stacks: MicropStackType) => (req: IMicropOriginalRequest, res: IMicropOriginalResponse) => Promise<404 | undefined>;
//# sourceMappingURL=request.d.ts.map