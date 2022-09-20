//#region CreateRegexpUrl
    /**
     * @description #url yi alip istek geldiginde Endpoint path'i ile karsilastirabilmek icin regexpe ceviriyor
     *              #path undefined ise butun url ler ile eslestiriyor
     *              #"/user" =>  /^\/user$/ 
     * @param {string | undefined} path
     * @returns {RegExp} 
     */
    export default (path?: string) : RegExp =>  {
        if(path) {
        return new RegExp("^"+path.replace(/:\w+/g, "\\w+") + "$")
        }
        return new RegExp(".*")
    }
//#endregion