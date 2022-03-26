const { Microp } = require("../lib/index");


const app = new Microp();

const logHook = request => {

    console.log("logged")

    return
}





app.get("/" ,[logHook], request => {


    return { body : "Selam dunya" }
})







app.addEndpoint({
    method: Methods.Get,
    path: "/",
    hooks: [logHook],
    handler: (request) => {
        return { body : "Selam dunya" }
    }
})






app.listen(3000)

