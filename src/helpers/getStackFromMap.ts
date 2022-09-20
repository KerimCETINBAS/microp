import {  MicropStackItem } from "../internal/stack"

export default (key: string, map: Map<RegExp, MicropStackItem> = new Map()): MicropStackItem | null => {

    for (const [reg, str] of map.entries()) {
        if(reg.test(key)) return str as MicropStackItem
    }


    return null
}

