declare module 'microp/app/index' {
  /// <reference types="node" />
  import { Server } from "http";
  import { Core, MicropHandler, MicropMiddleware } from "microp/core/index";
  /**
   * app interface'i cora'a http serveri implement ediyor
   * bu sekilde Microp classi server propertysi ve listen metoduna sahip
   */
  interface App {
      readonly server: Server;
      listen: (port: number, callback?: () => void) => this;
  }
  /**
   * @description
   */
  export class Microp extends Core implements App {
      use(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      use(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      use(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      use(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      get(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      get(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      get(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      get(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      post(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      post(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      post(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      post(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      put(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      put(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      put(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      put(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      patch(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      patch(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      patch(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      patch(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      delete(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      delete(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      delete(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      delete(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      head(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      head(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      head(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      head(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      option(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      option(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      option(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      option(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      readonly server: Server;
      listen(port?: number, callback?: (() => void) | undefined): this;
  }
  export class MicropRouter extends Core {
      use(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      use(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      use(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      use(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      get(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      get(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      get(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      get(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      post(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      post(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      post(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      post(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      put(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      put(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      put(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      put(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      patch(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      patch(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      patch(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      patch(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      delete(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      delete(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      delete(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      delete(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      head(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      head(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      head(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      head(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      option(handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      option(path: string, handler: MicropMiddleware | MicropHandler | MicropRouter): this;
      option(handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
      option(path: string, handler: (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
  }
  export {};

}
declare module 'microp/body/index' {
  /// <reference types="node" />
  import { IncomingMessage } from "http";
  type Input = {
      filename?: string;
      name?: string;
      type: string;
      data: Buffer;
  };
  export function getBoundary(header: string): string;
  export class MicropForm {
      private fields;
      get(name: string): Input | undefined | string;
      getAll(name: string): (Input | string)[] | undefined;
      append(name: string, value: Input): this;
  }
  export class MicropBody {
      readonly originalRequest: IncomingMessage;
      constructor(req: IncomingMessage);
      formData(): Promise<MicropForm>;
      blob(): Promise<Blob>;
      json(): Promise<Record<string, unknown>>;
      text(): Promise<string>;
      buffer(): Buffer;
  }
  export {};

}
declare module 'microp/core/index' {
  /// <reference types="node" />
  import { EventEmitter } from "events";
  import { IncomingMessage, ServerResponse } from "http";
  import { MicropRouter } from "microp/app/index";
  import { MicropBody } from "microp/body/index";
  export enum EMicropMethod {
      USE = 0,
      GET = 1,
      POST = 2,
      PUT = 3,
      PATCH = 4,
      DELETE = 5,
      HEAD = 6,
      OPTIONS = 7
  }
  export const MicropMethod: Record<number, RegExp>;
  export interface IOriginalRequest extends IncomingMessage {
      [key: string]: unknown;
      locals: Record<string, unknown>;
  }
  export interface IOriginalResponse extends ServerResponse {
      [key: string]: unknown;
  }
  export interface IMicropRequest {
      body: MicropBody;
      cookies: Record<string, string>;
      headers: Record<string, string>;
      method?: string;
      url?: string;
      params?: Record<string, string>;
      locals?: Record<string, unknown>;
      query?: Record<string, string | string[]>;
  }
  export interface IMicropResponse {
      status?: number;
      body?: string | Buffer | Uint8Array | Record<string, unknown> | Array<unknown>;
      headers?: Record<string, string>;
      cookies?: any;
      locals?: Record<string, unknown>;
  }
  /**
   *
   */
  export interface IStackItem {
      path?: string;
      method: RegExp;
      regexpPath?: RegExp;
      handler: MicropHandler | MicropMiddleware;
      params?: Record<string, string>;
      cookies?: Record<string, string>;
      query?: Record<string, string>;
      isMiddleware: boolean;
  }
  export type MicropHandler = (request: IMicropRequest) => Promise<IMicropResponse> | IMicropResponse;
  export class MicropMiddleware {
      readonly middleWareFunc: (req: IncomingMessage, res: ServerResponse, next: (error?: unknown) => void) => void;
      constructor(middleWareFunc: (req: IncomingMessage, res: ServerResponse, next: (error?: unknown) => void) => void);
  }
  export abstract class Core extends EventEmitter {
      protected stack: IStackItem[];
      get Stack(): IStackItem[];
      abstract use(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract use(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract use(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
      abstract use(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
      abstract get(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract get(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract get(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
      abstract get(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
      abstract post(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract post(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract post(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
      abstract post(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
      abstract put(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract put(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract put(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
      abstract put(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
      abstract patch(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract patch(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract patch(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
      abstract patch(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
      abstract delete(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract delete(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract delete(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
      abstract delete(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
      abstract head(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract head(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract head(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
      abstract head(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
      abstract option(handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract option(path: string, handler: MicropHandler | MicropRouter | MicropMiddleware): this;
      abstract option(handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
      abstract option(path: string, handler: (MicropHandler | MicropRouter | MicropMiddleware)[]): this;
  }

}
declare module 'microp/helpers/index' {
  import { IncomingMessage, ServerResponse } from "http";
  import { IStackItem, MicropMiddleware } from "microp/core/index";
  export const CreateStackItem: (method: RegExp, path: unknown, handler: unknown) => IStackItem[];
  /**
   * @description Middleware tipindeki handleri requestHandlerin icine cagiriyor
   * @param {IOriginalRequest} req
   * @param {IOriginalResponse} res
   * @param middleware MiddlewareFunction
   * @returns {req: IOriginalRequest, res:IOriginalResponse}
   */
  export const registerMiddleware: (req: IncomingMessage, res: ServerResponse, middleware: MicropMiddleware) => boolean;
  export interface ICookieOptions {
      Expires?: Date;
      MaxAge?: number;
      Domain?: string;
      Path?: string;
      Secure?: boolean;
      HttpOnly?: boolean;
      SameSite?: "Strict" | "Lax" | "None";
  }
  export const CookieParser: (cookieHeader: string) => Record<string, string>;
  export const SetCookie: (name: string, value: string, options: ICookieOptions) => string;
  export const getParams: (url: string, params: Record<string, string>) => Record<string, string>;
  export const ParseQurtyString: (str: string, host: string) => Record<string, string[] | string>;
  export const ResponseBodyParser: (body: unknown) => unknown;

}
declare module 'microp/index' {
  export { Microp as default, Microp, MicropRouter } from "microp/app/index";
  export { MicropMiddleware } from "microp/core/index";
  export type { MicropMethod, MicropHandler } from "microp/core/index";
  export { SetCookie } from "microp/helpers/index";

}
declare module 'microp' {
  import main = require('microp/index');
  export = main;
}