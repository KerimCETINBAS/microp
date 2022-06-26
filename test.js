const { SetCookie } = require("./dist/helpers")
const { Microp } = require("./dist/index")


const app = new Microp().get("/", request => {
   console.log(request.cookies)
   return {
        headers: {
            "set-cookie": [ SetCookie("babanze", "ananze11" , {Path: "/", HttpOnly: true})]
        },
        body: "hello",
      
    }
}).listen(3000)