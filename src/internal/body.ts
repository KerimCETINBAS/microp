import { IncomingMessage } from "http"

type Input = {
    filename?: string
    name?: string
    type: string
    data: Buffer
  }

  type Part = {
    header: string
    info: string
    part: number[]
  } 
  
  function process(part: Part): Input {
  
    const obj = function(str: string) {
      const k = str.split('=')
      const a = k[0].trim()
  
      const b = JSON.parse(k[1].trim())
      const o = {}
      Object.defineProperty(o, a, {
        value: b,
        writable: true,
        enumerable: true,
        configurable: true
      })
      return o
    }
    const header = part.header.split(';')
  
    const filenameData = header[2]
    let input = {}
    if (filenameData) {
      input = obj(filenameData)
      const contentType = part.info.split(':')[1].trim()
 
      Object.defineProperties(input,{
        "type" : {
            value: contentType,
            writable: true,
            enumerable: true,
            configurable: true
        },
        'name': {
            value: header[1].split('=')[1].replace(/"/g, ''),
            writable: true,
            enumerable: true,
            configurable: true
        }
      })
    } else {
    
      Object.defineProperty(input, 'name', {
        value: header[1].split('=')[1].replace(/"/g, ''),
        writable: true,
        enumerable: true,
        configurable: true
      })
    }
  
    Object.defineProperty(input, 'data', {
      value: Buffer.from(part.part),
      writable: true,
      enumerable: true,
      configurable: true
    })
    return input as Input
  }

  export function getBoundary(header: string): string {
    const items = header.split(';')
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = new String(items[i]).trim()
        if (item.indexOf('boundary') >= 0) {
          const k = item.split('=')
          return new String(k[1]).trim().replace(/^["']|["']$/g, "")
        }
      }
    }
    return ''
  }

export class MicropForm {

    private fields: { name:string, input:Input}[]= []    
    get(name: string): Input | undefined | string {
         const field = this.fields.find(f => f.name == name)?.input
         return field?.type ? field : field?.data.toString()
    }
    getAll(name:string): (Input | string)[]  | undefined {
       const field = this.fields.filter(f => f.name == name).map(x => x.input.type ? x.input : x.input.toString())
       return field
    }
    append(name: string, value: Input ):this {
        this.fields = [...this.fields, {name,  input:value}]
        return this
    }
}
export class MicropBody   {
    readonly originalRequest: IncomingMessage;
    constructor(req: IncomingMessage) {
        this.originalRequest = req
    }
    formData(): Promise<MicropForm> {
        let lastline = ''
        let header = ''
        let info = ''
        let state = 0
        let buffer: number[] = []
        let boundary = getBoundary(this.originalRequest.headers["content-type"] || "")
        const allParts: Input[] = []
        
        return new Promise((resolve) => {
            this.originalRequest.on("data", multipartBodyBuffer => {
                for (let i = 0; i < multipartBodyBuffer.length; i++) {
                    const oneByte: number = multipartBodyBuffer[i]
                    const prevByte: number | null = i > 0 ? multipartBodyBuffer[i - 1] : null
                    const newLineDetected: boolean =
                      oneByte === 0x0a && prevByte === 0x0d ? true : false
                    const newLineChar: boolean =
                      oneByte === 0x0a || oneByte === 0x0d ? true : false
                    if (!newLineChar) lastline += String.fromCharCode(oneByte)
                
                    if (0 === state && newLineDetected) {
                      if ('--' + boundary === lastline) {
                        state = 1
                      }
                      lastline = ''
                    } else if (1 === state && newLineDetected) {
                      header = lastline
                      state = 2
                      if (header.indexOf('filename') === -1) {
                        state = 3
                      }
                      lastline = ''
                    } else if (2 === state && newLineDetected) {
                      info = lastline
                      state = 3
                      lastline = ''
                    } else if (3 === state && newLineDetected) {
                      state = 4
                      buffer = []
                      lastline = ''
                    } else if (4 === state) {
                      if (lastline.length > boundary.length + 4) lastline = ''
                      if ('--' + boundary === lastline) {
                        const j = buffer.length - lastline.length
                        const part = buffer.slice(0, j - 1)
                        const p: Part = { header: header, info: info, part: part }
                        allParts.push(process(p))
                        buffer = []
                        lastline = ''
                        state = 5
                        header = ''
                        info = ''
                      } else  buffer.push(oneByte)
                      
                      if (newLineDetected) lastline = ''
                    } else if (5 === state) {
                      if (newLineDetected) state = 1
                    }
                  }
            })
            this.originalRequest.on("end", () => {
               const formData:MicropForm = new MicropForm()
                
               for(const field of allParts)  formData.append(field.name|| "File", field)
                  
          
          
                resolve(formData)
            })
        })
      
       
    }
    blob(): Promise<Blob> {
         return new Response(
            this.originalRequest as unknown as BodyInit,
            {
                headers: this.originalRequest.headers as HeadersInit
            }).blob()
    }

    json(): Promise<Record<string, unknown>> {
      
        return new Response(
            this.originalRequest as unknown as BodyInit,
            {
                headers: this.originalRequest.headers as HeadersInit
            }).json()
       
    }

    text(): Promise<string> {

        return new Response(
            this.originalRequest as unknown as BodyInit,
            {
                headers: this.originalRequest.headers as HeadersInit
            }).text()
    }

    buffer(): Buffer {

        return Buffer.from([])
    }


  
}