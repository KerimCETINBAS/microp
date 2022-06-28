/// <reference types="node" />
import { Server } from "http";
import { Core, MicropHandler, MicropMiddleware } from "../core/index";
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
export declare class Microp extends Core implements App {
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
export declare class MicropRouter extends Core {
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
