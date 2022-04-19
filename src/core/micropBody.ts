import { IncomingMessage } from "http";
import { IncomingForm, Formidable, Options, defaultOptions } from "formidable"
export class MicropBody {
    private fields: Record<string, any> = {}
    constructor(private req: IncomingMessage) {
        const form = new Formidable({})
        form.parse(this.req, (err, fields, files)=> {
            if(err) throw new Error("Malformed body")
            Object.assign(this.fields, fields)
            Object.assign(this.fields, Object.entries(files).reduce((t,c)=>({...t,[c[0]] : {...c[1], isFile: true}}),{}))
        })
    }
    form(options?:Options  ):  Promise<Record<string, any>> {
        return new Promise(resolve => {
            this.req.once("end", () => resolve(this.fields))
        })
    }
}