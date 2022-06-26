const { writeFile, writeFileSync } = require("fs")
const { Microp, MicropRouter } = require("./dist/app/index")



const app = new Microp()
const userRouter = new MicropRouter()

.post("/upload", [async request => {
    console.log(request.method)
    const form = await request.formData()
    const image = form.get("selam")
    writeFileSync(image.filename, image.data)

    return {
        locals: {test:"test1"}
    }

}, request => {
    return {
        body: request.locals.test
    }
}])

app.use("/user", userRouter)
.listen(3000)

// const express = require("express")
// const app = express()

// const userRouter = express.Router()
// .post("/upload", (req, res) => {
//     res.send("oldu")
// })


// app.post("/user", userRouter)
// app.listen(3000)