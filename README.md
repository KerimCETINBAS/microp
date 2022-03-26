# Microp micro server library 

 Microp is a micro server library with zero dependencies and can work with middlewares 


---
## Installation

NPM
```shell
npm install microp
```

yarn
```shell
yarn add microp
```


## Usage

```js
const { Microp, Methods } = require("microp");

// with Typescript

import { Microp, Methods } from "microp";
```


to create a microp app basicly instantiate Microp class


```js
const { Microp, Methods } = require("microp");
const app = new Microp();

app.listen(3000);
```

visit http://localhost:3000 and you will see; pretty smiliar right?!


![image `cannot get`](./images/microp.png)



### registering a route



```js
...

const app = new Microp();

app.addEndpoint({
    method: Methods.Get,
    path: "/",
    handler: (request) => {


        return {
            // you can return headers and status as well
           
            body: "hello world"
        }
    }
})
app.listen(3000); 
```

![image `hello world`](./images/microp-hello-world.png)

### using middlewares


```js
...
import { json } from "body-parser"
...


app.use(json())

//or

app.use((req,res,next)=> {

    console.log("middleware");
    next();
})

```

also you can return an object, all objects merged into one,
on endpoint you can access the object under request.locals

```js
...


app.use((req,res,next)=> {

    next();
    return {
        hello: "world"
    }
})



app.addEndpoint({
    method: Methods.Get,
    path: "/",
    handler: (request) => {


        return {
           
            body: request.locals.hello
        }
    }
})


```
same as expected
![image `hello world`](./images/microp-hello-world.png)


### using hooks

hooks are just like middlewares but they are attach on a endpoint

```js
...


                // you can access Microp request as well
const logHook = (request) => {
    
    console.log("logged");
    // you can return an object that will merged to next request objects
    return {
        Hello : "world"
    }
}


app.addEndpoint({
    method: Methods.Get,
    path: "/",
    hooks: [logHook],
    handler: (request) => {


        return {
            // you can return headers and status as well
            status: 200,
            headers: {
                "content-type": "text/plain"
            },
            body: request.Hello
        }
    }
})


```
