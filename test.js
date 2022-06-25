const { Microp } = require("./lib/index")

const app = new Microp()

app.get("/", request => {
    
    return {
        body: "hello"
    }
})
app.listen(3000)