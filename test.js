const {  Microp, Methods , HTTPError } = require("./lib");
const {json, urlencoded} = require("body-parser")




const app = new Microp()


function logger(request) {


    console.log("log")
    //throw new HTTPError({ status: 404, message: "user not exist"})
    
    return {
        test: "test1"
    }
} 

app.use(json())
app.use((req,res,next)=> {
    next()
 

    return {
        "deneme": "test"
    }
})

app.addEndpoint({
    method: Methods.Get,
    path: "/",
    hooks: [logger],
    handler: async (request) => {
        console.log(request)
        return {
            status: 200,
            headers: {
                "Content-Type" : "text/plain"
            },
            body:   "request.params.hello"
        }
    }
})
app.listen(3000)