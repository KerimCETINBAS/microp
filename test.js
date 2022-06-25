const { Microp } = require("./lib/index")

const app = new Microp()

app.get("/", async ({ body }) => {
    
    const sbody = await body.formData()
    console.log(sbody.get("asd"))
    return {
        body: sbody.get("asd")
    }
})
app.listen(3000)