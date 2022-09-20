import { MicropHandler, MicropMiddleware } from "./handler";
export declare type MicropStackType = Map<RegExp, MicropStackItem>;
export declare class MicropStackItem {
    path?: string | RegExp;
    pathRegexp: RegExp;
    params: Record<string, string>;
    private handlers;
    constructor(path: string, pathRegexp: RegExp, params: Record<string, string>, handler: (MicropMiddleware | MicropHandler)[] | MicropHandler | MicropMiddleware);
    get Handlers(): {
        handler: MicropHandler | MicropMiddleware;
        handlerType: "Middleware" | "Handler";
    }[];
    addHandler(handler: MicropHandler | MicropMiddleware): void;
}
export interface IMicropStackable {
    stacks: MicropStackType;
}
//# sourceMappingURL=stack.d.ts.map