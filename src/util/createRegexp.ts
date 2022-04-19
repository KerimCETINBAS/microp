export const createRegexpUrl = (path: string) : RegExp => 
    new RegExp("^"+path.replace(/:\w+/g, "\\w+") + "\/?$")

