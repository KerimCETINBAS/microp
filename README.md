
# Microp 

Microp is a micro server library with zero dependency

## Microp comes with varius features
- Built in body parsers can handle Multipart/formData , json, text, blob, typeed arrays and buffer without any external dependency
- Can handle params/querystrings
- Can be used with express like middlewares

# 
## Documantation

### install Microp

*To use microp NODE 18.X.X required*  
  
Microp uses node18 native fetch api
#### NPM
```shell 
    npm install microp
```
#### YARN
```shell 
    yarn add microp
```

### usage

#### javascript
```js
    // javascript
    const { Microp } = require("microp")
    
    // typescript
    import { Microp } from "microp"


    const app = new Microp()
    ...
    app.listen(3000)
```


### Registering an endpoint handler

```js
    ...
    const app = new Microp()
    
    app.get("/", request => {

        return {
            body: "Hellow world"
        }
    })
    ...
```


 Also can pass multiple handler in endpoint as array  
 this handlers will run recursevely untill body or status returned

```js
    ...
    const app = new Microp()
    
    const loggerHandler = request => { 
        console.log("logged") 
        return {}
    }

    app.get("/", [
        loggerHandler,
        request => ({  body: "Hellow world" })
    ])
    ...
```


### Use with express like middlewares

To register express like middleware we have a hellper class MicropMiddleware

```js
    
    const {Microp, MicropMiddleware} = require("Microp")
    const app = new Microp()
    
    const loggerMiddleware = new MicropMiddleware((req, res, next) => {
        console.log("logged")
        next()
    })

    app.get("/", [
        loggerMiddleware,
        request => ({  body: "Hellow world" })
    ])
    ...
```

### Use with router

```js
    
    const {Microp, MicropRouter} = require("Microp")
    const app = new Microp()
    
    const userRouter = new MicropRouter()

    userRouter.get("/:id", async ({params}) => {
        
        return {
            body: await Users.findById(params.id) // fake orm
        }
    })

    userRouter.get("/", async () => ({body: await Users.find()}))

    app.use("/user", userRouter)
    ...
```

### Reading body
```js
    ...
    ...
    const app = new Microp()
    app.get("/user", async ({body}) => {

        const data = await body.json() // .formData() .text() .blob() 

        return {
            body: await User.create(data)
        }
    })
    ...
```

### use with endpoint params
```js
    ...
    app.get("/user/:id", async ({params}) => {

        // params is a Recored<string,string>
        return {
            body: await User.delete(Number(params.id))
        }
    })
    ...
```
### querystrings 
```js
    ...
    
    app.get("/user", async ({query}) => {

        // params is a Recored<string,string>
        return {
            body: await User.delete(Number(params.id))
        }
    })
    ...
```

### you can directly set cookie by return cookies in array
```js
    ...

    app.get("/",  () => ({
            body: "Hello world",
            cookies: ["session=topSecretTokenThatIsNotOnGitHub; Path=/;"]
    }))

    ...

```

also you can use a Helper function that creates cookie for you

```js
    
    const { Microp, setCookie } = require("microp")
    const app = new Microp()
    

    app.get("/",  () => ({
            body: "Hello world",
            cookies: [ setCookie("cookieName", "cookieValue", { ...cookieOptions })]
        }))
```


### 
You can directly send headers aby returning headers object 

```js

    app.get("/user", async ({query}) => {

        return {
            headers: {
                location: "/login"
            },
            status: 302
        }
    })
```