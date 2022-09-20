import { IMicropOriginalResponse } from "./response";

export default (headers: Record<string, string>, res: IMicropOriginalResponse) => {
    
    for(const [key, value] of Object.entries(headers)) res.setHeader(key, value)
  
}