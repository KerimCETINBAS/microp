import type {  IMicropMiddleware, Methods, MicropHandler } from ".."


/**
 * @description create regexp from route path, on request compare with requested url regexp.test(req.url)
 * @param {string} path 
 * @returns {RegExp}
 */
export const createRegexpUrl = (path: string) : RegExp =>
        new RegExp("^"+path.replace(/:\w+/g, "\\w+") + "\/?$")


/**
 * @description 
 *      parse url params and segment index from route path 
 *      /todo/:name - param name and segment 1
 *            
 * @param {string} path
 * @returns {Record<string, number>}
 */
export const createParams = (path: string) : Record<string, undefined > => {
    const segments = path.trim().split("/").filter(t => t != "")
    const params = segments.map((segment, index)=> {
        const isRegexp = /^:\w+$/.test(segment)
        return {
            isRegexp,
            index,
            param: segment.replace(":","")
        }
        
    }).filter(s => s.isRegexp).reduce((a:any, v) => {
        a[v.param] = v.index; return a;
    }, {}) as Record<string, undefined>
    return params
}

/**
 * @todo get querystrings from url
 * @param url 
 * @returns 
 */
export const getQueryString = (url: URL): Record<string, unknown>  => ({})
 
/**
 * @todo create stack item from route and router
 * @param method 
 * @param regexpUrl 
 * @param params 
 * @param handler 
 * @param middleware 
 * @param hooks 
 */



export const IsJson = (str: string): boolean => {
    return /^[\],:{}\s]*$/
        .test(str.toString().replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, '')) 

   
}