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


Using with express middlewares, router, multipart body parsing in progress


## Usage

```js
const { Microp } = require("microp");

// with Typescript

import { Microp } from "microp";
```


to create a microp app basicly instantiate Microp class


```js
const { Microp } = require("microp");
const app = new Microp();

app.listen(3000);
```



### registering a route



```js
...

const app = new Microp();

// you can use app. post put patch delete as well
app.get("/", request=> {

    return {
        status: 200,
        headers: {
            "content-type": "text/html"
        },
        body: "<span> Hello world </span>" // you can return buffer, uintarray, object as well
    }
})
app.listen(3000); 
```


using with params
```js
...

const app = new Microp();

// param only can contain alphanumaric characters and underscore (_)
app.get("/user/:id", request=> {
    
    const user = users.find(user => user.id == request.params.id)

    return user 
        ? { status: 404 } 
        : { status: 200, body: user }    

})
app.listen(3000); 
```


accssing request body
```js
...

const app = new Microp();

app.patch("/user/:id", async request => {

    const data = await request.body.json() // .text()
    
    const userIndex = users.findIndex(user => user.id == request.params.id)

    user[userIndex] = data 
    
    return {
        status: 200
    } 

})
app.listen(3000); 
```




You can pass array of handlers
They will run after each other untill a status code or body passed

```js
...

const loghook = request => {

    console.log("loggged")

    return 
}

app.get("/", [loghook, request=> {

    return {
        status: 200,
        body: "This route used with loghook"
    }
}])







```
