import { IncomingMessage, ServerResponse } from "http";
import { IStackItem, MicropMiddleware } from "../core";
export declare const CreateStackItem: (method: RegExp, path: unknown, handler: unknown) => IStackItem[];
/**
 * @description Middleware tipindeki handleri requestHandlerin icine cagiriyor
 * @param {IOriginalRequest} req
 * @param {IOriginalResponse} res
 * @param middleware MiddlewareFunction
 * @returns {req: IOriginalRequest, res:IOriginalResponse}
 */
export declare const registerMiddleware: (req: IncomingMessage, res: ServerResponse, middleware: MicropMiddleware) => Promise<{
    req: IncomingMessage;
    res: ServerResponse;
}>;
export interface ICookieOptions {
    Expires?: Date;
    MaxAge?: number;
    Domain?: string;
    Path?: string;
    Secure?: boolean;
    HttpOnly?: boolean;
    SameSite?: "Strict" | "Lax" | "None";
}
export declare const CookieParser: (cookieHeader: string) => Record<string, string>;
export declare const SetCookie: (name: string, value: string, options: ICookieOptions) => string;
export declare const getParams: (url: string, params: Record<string, string>) => Record<string, string>;
export declare const ParseQurtyString: (str: string, host: string) => Record<string, string[] | string>;
export declare const ResponseBodyParser: (body: unknown) => unknown;
//# sourceMappingURL=index.d.ts.map