import { IncomingMessage, ServerResponse } from "http";
import { IOriginalRequest, IOriginalResponse, IStackItem, MicropMiddleware } from "../core";
export declare const CreateStackItem: (method: RegExp, path: unknown, handler: unknown) => IStackItem[];
/**
 * @description Middleware tipindeki handleri requestHandlerin icine cagiriyor
 * @param {IOriginalRequest} req
 * @param {IOriginalResponse} res
 * @param middleware MiddlewareFunction
 * @returns {req: IOriginalRequest, res:IOriginalResponse}
 */
export declare const registerMiddleware: (req: IOriginalRequest, res: IOriginalResponse, middleware: MicropMiddleware) => {
    req: IncomingMessage;
    res: ServerResponse;
};
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
