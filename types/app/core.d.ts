/// <reference types="@types/node" />
import { IncomingMessage, Server, ServerResponse } from "http";
import { MicropHandler, MicropMiddleware } from "../internal/handler";
import { IMicropStackable, MicropStackType } from "../internal/stack";
import { MicropRouter } from "./router";
export interface IMicropServer {
    server: Server<typeof IncomingMessage, typeof ServerResponse>;
    listen(port: number, callback?: () => void): this;
}
export declare class Core implements IMicropStackable {
    stacks: MicropStackType;
    use(handler: MicropHandler | MicropHandler[] | MicropMiddleware | MicropRouter): this;
    use(path: string | RegExp, handler: MicropHandler | MicropRouter | MicropMiddleware | (MicropMiddleware | MicropHandler | MicropRouter)[]): this;
}
//# sourceMappingURL=core.d.ts.map