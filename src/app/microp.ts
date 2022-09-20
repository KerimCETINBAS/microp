import { Server, IncomingMessage, ServerResponse } from "http";
import getStackFromMap from "../helpers/getStackFromMap";
import { MicropHandler, MicropMiddleware } from "../internal/handler";
import { CompansateRequest, IMicropOriginalRequest } from "../internal/request";
import { IMicropOriginalResponse } from "../internal/response";
import { IMicropStackable, MicropStackItem, MicropStackType } from "../internal/stack";
import { Core, IMicropServer  } from "./core";
import { MicropRouter } from "./router";



export class Microp extends Core implements IMicropServer, IMicropStackable{
    


    server: Server = new Server(CompansateRequest(this.stacks));

    listen(port: number, callback?: () => void): this {
        this.server.listen(port, callback)
        return this
    }
}


