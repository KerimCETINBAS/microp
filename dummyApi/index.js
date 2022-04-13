const { Microp, MicropRouter } = require("../lib/index")
const os = require("os")


console.log(MicropRouter)

const PORT = process.env.PORT || 3000
const app = new Microp()


const handler = async (req) => {
    // promise yerine request bittikten sonra endpoint calisabilir
    if(await req.locals.hasFile) {
        console.log("hasFile")
    }
    else {
        console.log("noFile")
    }
    return {
        body: "test"
    }
}


//const userRouter = new MicropRouter()

app.use("/user",handler)


app.listen(3000)