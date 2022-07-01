import type { IMicropRequest, IMicropResponse, MicropHandler } from "../src/core"

import { assert, expect } from "chai"
import { MicropBody } from "../src/body"
import { IncomingMessage } from "http"
import { Microp } from "../src/app"

describe("endpoint handler" , () => {


    it("should return empty object", ()=> {
        const handler: MicropHandler = (request) => {

            return {}
        }
        let request: IMicropRequest = {
            body: new MicropBody({} as IncomingMessage),
            cookies: {},
            headers: {}
        }

        const app = new Microp()

        app.use(request => {
            return {}
        })
        
        expect((app.Stack[0].handler as MicropHandler)(request)).to.be.empty
    })

    it("should return string body", ()=> {

        const handler: MicropHandler = (request) => {

            return {}
        }
        let request: IMicropRequest = {
            body: new MicropBody({} as IncomingMessage),
            cookies: {},
            headers: {}
        }

        const app = new Microp()

        app.use(request => {
            return {
                body: "hello world"
            }
        })

        expect((app.Stack[0].handler as MicropHandler)(request)).to.has.property("body").to.be.a("string")

    })

    it("should return object body", ()=> {

        const handler: MicropHandler = (request) => {

            return {}
        }
        let request: IMicropRequest = {
            body: new MicropBody({} as IncomingMessage),
            cookies: {},
            headers: {}
        }

        const app = new Microp()

        app.use(request => {
            return {
                body: {
                    say: "hello world"
                }
            }
        })
        
        expect((app.Stack[0].handler as MicropHandler)(request)).to.has.property("body").to.be.a("object")

    })
})