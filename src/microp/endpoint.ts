
import { MicropHandler, Methods } from "../core/types";
import { createParams, createRegexpUrl } from "../util";


/**
 * @description The class create a endpoint when a endpoint registered via app or router
 * @property { string } path - Path of regestered endpoint ie: /user , /user/:id
 * @property { Enum Methods } method - Http method of registered endpoint
 * @property { RegExp } regexpUrl - regexp version of path
 * @property { MicropHandler[] } handlers - handler functions to attached this endpoint
 * @property { Record<string, unknown> } params params of endpoint - When class initalized pram values present the segment value, when a request came it will replaced with actual value
 * @description Handleers run next to next untill body returnded
 * @constructor just simply set the readonly values when class initalized
 * @method createRegexpUrl - creates regexp from path
 * @method createParams - creates params from path
 */
export class MicropEndpoint {

    readonly path: string
    readonly method: Methods
    readonly regexpUrl: RegExp
    readonly handlers:MicropHandler[] = []
    params: Record<string,unknown>
    constructor (method: Methods,path: string | undefined, ...handler: MicropHandler[]) {

        this.path = path || "";
        this.method = method
        this.regexpUrl = createRegexpUrl(path ? path : "")
        this.params = createParams(path ? path : "")
        this.handlers = handler
       

    }
}