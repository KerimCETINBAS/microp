//#region createParams
    /**
     * @description #Endpoint pathindan parametre yaratiyor 
     *              #"/user/:id" => { id: ... }
     * @param {string|undefined} path  
     * @returns {Record<string,string>}
     */
    export const createParams = (path: string) => {
        
        const segments = path.split("/").filter(s => s !== "").reduce((t,c,i)=> {
            if(/^:/.test(c)) return {...t, [c.replace(/^:/,"")]: i}
            return t  }, {})
        return segments
    }
//#endregion



export const getParams = (url: string, params: Record<string, string>): Record<string, string> => {

    let param: string[] = url.replace(/\/?\?.*/g,"").split("/")
        param.shift()
        return  Object.entries(params).map(( p: [string, string]) => {
            return { [p[0]] : param[Number(p[1])] }
    }).reduce((t: Record<string,string>, c: Record<string,string>) => ({...t, ...c}) , {})
}
