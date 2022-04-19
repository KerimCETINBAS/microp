# Microp micro server library 

 Microp is a micro server library built over nodejs standart http module

 Only dependency is https://www.npmjs.com/package/formidable

&nbsp;&nbsp;
# Installation

NPM
```shell
npm install microp
```

yarn
```shell
yarn add microp
```

&nbsp;&nbsp;
## Usage

  
```js
const { Microp } = require("microp");

// with Typescript

import { Microp } from "microp";

```


### Creating new microp app


```js
const { Microp } = require("microp");
const app = new Microp();

app.listen(3000);

```



### registering a route
```js
/* 
    .use() will handle all methods, 
    you can use get, post, put, patch, delete, head, options as well

*/
app.use( request => {

    return {
        body "hello world"
    }
})

// or you can register on a spesific path
app.use("/", request => {

    return {
        body "hello world"
    }
})
```
### Params
All params will be accessible at request.params
Params must be match with /\\:\w+/ 
```js
app.use("/user/:id", request => {
     
    return {
        body : user[request.params.id] // fake data source
    }
})
```



### Query string

Querystrings will be accessible at request.query
```js
app.use("/user", request => {
     
    return {
        body : user[request.query.id] // fake data source
    }
})
```


### Request body 
accessing request body is asynchronous

```js
app.post("/user", async  request => {

    const { user } = await request.body()

    users.push(user) // fake data store

    return {
        status: 200
    }
})
```
also you can access files as well  
files upload os tmp dir
```js
app.post("/user/:id", async  request => {

    const { avatar } = await request.body()

    if(avatar.isFile) {
        //  move file from tmp dir

        users[request.params.id].avatar = some/upload/path.ext
    }

    return {
        status: 200
    }
})
```
&nbsp;
# Registering multiple handler on same endpoint

## option 1
```js

app.use("/", request => {
    console.log("Handler 1")
    return 
})

app.use("/", request => {
    console.log("Handler 2")
    return 
})


app.use("/", request => {
    console.log("Handler 3")
    return {
        body: "hello world"
    }
})


```

all handlers will be run recusively untill body or status code sended

also you can send parameter one handler to next handler

```js

app.use("/", request => {
    console.log("Handler 1")

    // all properties in the locals will be accesible at next handler 
    return {
        locals: {
            hello: "world"
        }
    }
})

app.use("/", request => {
    console.log(request.locals.hello) // world
    return {
        status: 200
    }
})

```
## option 2
this is yet another elegant way to organize endpoint management
```js

    const logger = request => console.log("user")
    // passing handlers in an array
    app.get("/user" , [logger, request => {

        return {
            body: "jdoe"
        }
    }])
```
# Middlewares 
Middlewares is a Tradional express way of handler with (req, res, next) pattern
if you dont need this type of middleware  
consider using standart microp handler


```js
    const { MicropMiddleware } = require("microp")
    const Helmet = require("helmet")

    const helmetMiddleware = new MicropMiddleware(helmet())

    app.use(helmetMiddleware) // will hit every endpoints
    
    //or

    app.get("/user",helmetMiddleware)

    //or

    app.get("/user" , [helmetMiddleware, request => {
        return {
            body: "jdoe"
        }
    }])
```
# Router

You can pass a router as a handler

```js
const { Microp, MicropRouter } = require("microp")


const router = new MicropRouter("/products")// you can prefix url in consructor its optional

router.post(async request=> {
    await users.create( await request.body())
    return {
        status: 200
    }
})

router.get("/:id", async request=> {
    
    return {
        headers: {
            "content-type": "application/json"
        },
        status: 200,
        body: users.find( await request.params.id)
    }
})




const app = new Microp();

// if you pass a spesific path to handler, router constructor overriden with this path
app.use("/user", router)  
/*
    products overriden with /user now
    /products/** endpoints not hit anymore


*/



app.listen(3000);
```