import { Microp } from "./app/microp";
import { MicropRouter } from "./app/router";
import { MicropHandler } from "./internal/handler";
import { MicropRequest } from "./internal/request";
import { MicropResponse } from "./internal/response";

const app = new Microp()


app.use("/user", request => MicropResponse().NextHandler({ next: true }))

app.use("/user", request => MicropResponse().Json({ test: 'test' }))

app.use("/user/:id", request => {
   
    return MicropResponse({status: 200}).Json({ userId: request.params.id, ananze: request.locals.ananze })
})
app.listen(3000)



