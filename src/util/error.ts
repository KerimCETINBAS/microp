import { Methods } from "../core/types";

export class MicropEndpointError extends Error {

    constructor(path: string, method: Methods, message: string) {
        super(`${message} - ${method == Methods.ANY ? "" : method } ${path || "/~"}`)
    }
}