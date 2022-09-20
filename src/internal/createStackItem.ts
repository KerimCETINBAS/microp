import createRegexpFromPath from "../helpers/createRegexpFromPath";
import { MicropHandler, MicropMiddleware } from "./handler";
import { createParams } from "./param";
import { MicropStackItem } from "./stack";

export default (path: string | RegExp | undefined, handler: MicropHandler | MicropMiddleware): [RegExp, MicropStackItem] => {
    let regexpUrl
    let params: Record<string,string>
    if (!(path instanceof RegExp)) {
        
        regexpUrl = createRegexpFromPath(path);
        params = path ? createParams(path) : {}
        return [
            regexpUrl,
            new MicropStackItem(path || "*", regexpUrl, params, handler)
        ];
    }
    return  [path,   new MicropStackItem("*",path, {}, handler) ]
}