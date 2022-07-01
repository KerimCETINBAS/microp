import { IMicropRequest, IMicropResponse, MicropHandler, MicropMiddleware } from "../src/core"

import { assert, expect } from "chai"
import { MicropBody } from "../src/body"
import { IncomingMessage } from "http"
import { Microp } from "../src/app"

describe("app" , () => {


    it("should create new app", ()=> {

        const app = new Microp()
        expect(app).to.be.instanceOf(Microp)

    })

 
    it("should register an endpoint", ()=> {

        const app = new Microp()
        app.use(request => ({}))
        expect(app.Stack.length).to.be.eq(1)

    })


    it("should listen port", ()=> {

        const app = new Microp()
        app.listen(3000)
        expect(app.server.listening).to.be.eq(true)

    })

    it("should register middleware", ()=> {
        const app = new Microp()
        const m = new MicropMiddleware((req,res,next)=> { next()})

        app.use(m)

        expect(app.Stack[0].isMiddleware).to.be.eq(true)
    })
})