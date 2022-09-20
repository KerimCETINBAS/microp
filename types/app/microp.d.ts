/// <reference types="@types/node" />
import { Server } from "http";
import { IMicropStackable } from "../internal/stack";
import { Core, IMicropServer } from "./core";
export declare class Microp extends Core implements IMicropServer, IMicropStackable {
    server: Server;
    listen(port: number, callback?: () => void): this;
}
//# sourceMappingURL=microp.d.ts.map