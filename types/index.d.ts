declare module 'MicropNoDependency/app/index' {
  /// <reference types="node" />
  import { Server } from "http";
  import { Core, MicropHandler, MicropMiddleware } from "MicropNoDependency/core/index";
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
      get(handler: MicropHandler): this;
      get(path: string, handler: MicropHandler): this;
      get(handler: MicropHandler[]): this;
      get(path: string, handler: MicropHandler[]): this;
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
declare module 'MicropNoDependency/body/index' {
  /// <reference types="node" />
  import { IncomingMessage } from "http";
  import { IMicropRequest } from "MicropNoDependency/core/index";
  type Input = {
      filename?: string;
      name?: string;
      type: string;
      data: Buffer;
  };
  export function getBoundary(header: string): string;
  export class MicropForm {
      private fields;
      get(name: string): Input | undefined;
      append(name: string, value: Input): this;
  }
  export class MicropRequest implements IMicropRequest {
      readonly originalRequest: IncomingMessage;
      readonly headers: Record<string, string>;
      readonly cookies: Record<string, string>;
      readonly method?: string;
      readonly url?: string;
      readonly params: Record<string, string>;
      locals: Record<string, unknown>;
      constructor(req: IncomingMessage);
      formData(): Promise<MicropForm>;
      blob(): Promise<Blob>;
      json(): Promise<Record<string, unknown>>;
      text(): Promise<string>;
      buffer(): Buffer;
  }
  export {};

}
declare module 'MicropNoDependency/core/index' {
  /// <reference types="node" />
  import { EventEmitter } from "events";
  import { IncomingMessage, ServerResponse } from "http";
  import { MicropRouter } from "MicropNoDependency/app/index";
  import { MicropForm, MicropRequest } from "MicropNoDependency/body/index";
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
      json(): Promise<Record<string, unknown>>;
      formData(): Promise<MicropForm>;
      text(): Promise<string>;
      blob(): Promise<Blob>;
      cookies: Record<string, string>;
      headers: Record<string, string>;
      method?: string;
      url?: string;
      params: Record<string, string>;
      locals: Record<string, unknown>;
  }
  export interface IMicropResponse {
      status?: number;
      body?: string | Buffer | Uint8Array | Record<string, unknown>;
      headers?: Record<string, string>;
      cookies?: any;
      locals: Record<string, unknown>;
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
  export type MicropHandler = (request: MicropRequest) => Promise<IMicropResponse>;
  export class MicropMiddleware {
      readonly middleWareFunc: (req: IOriginalRequest, res: IOriginalResponse, next?: (error?: string) => void) => void;
      constructor(middleWareFunc: (req: IOriginalRequest, res: IOriginalResponse, next?: (error?: string) => void) => void);
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
declare module 'MicropNoDependency/helpers/index' {
  import { IncomingMessage, ServerResponse } from "http";
  import { IOriginalRequest, IOriginalResponse, IStackItem, MicropMiddleware } from "MicropNoDependency/core/index";
  export const CreateStackItem: (method: RegExp, path: unknown, handler: unknown) => IStackItem[];
  /**
   * @description Middleware tipindeki handleri requestHandlerin icine cagiriyor
   * @param {IOriginalRequest} req
   * @param {IOriginalResponse} res
   * @param middleware MiddlewareFunction
   * @returns {req: IOriginalRequest, res:IOriginalResponse}
   */
  export const registerMiddleware: (req: IOriginalRequest, res: IOriginalResponse, middleware: MicropMiddleware) => {
      req: IncomingMessage;
      res: ServerResponse;
  };

}
declare module 'MicropNoDependency/index' {
  export {};

}
declare module 'MicropNoDependency' {
  import main = require('MicropNoDependency/index');
  export = main;
}