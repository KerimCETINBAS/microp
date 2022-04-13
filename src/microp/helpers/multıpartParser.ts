import { IncomingMessage } from "http";


export class MultipartParser{

    private request: IncomingMessage
    private CONTENT_TYPE_RE = /^multipart\/(?:form-data|related)(?:;|$)/i;
    private CONTENT_TYPE_PARAM_RE = /;\s*([^=]+)=(?:"([^"]+)"|([^;]+))/gi;
    private FILE_EXT_RE = /(\.[_\-a-zA-Z0-9]{0,16})[\S\s]*/;
    private FILENAME_PARAM_RE = /\bfilename=(?:"(.*?)"|([!#$%&'*+.0-9A-Z^_`a-z|~-]+))($|; )/i
    private LAST_BOUNDARY_SUFFIX_LEN = 4; // --\r\n
    private NAME_PARAM_RE = /\bname=(?:"([^"]+)"|([!#$%&'*+.0-9A-Z^_`a-z|~-]+))/i
    constructor(req: IncomingMessage) {
        this.request = req
        

    }
}