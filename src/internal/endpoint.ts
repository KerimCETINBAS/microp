import { Microp } from "../app/microp";
import { MicropRouter } from "../app/router";
import { MicropHandler } from "./handler";



export type MicropEndpointHandler = (path?: string, handler?: MicropHandler | MicropHandler[]) => Microp | MicropRouter
