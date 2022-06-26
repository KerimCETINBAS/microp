
// json body
app.post("/user", async  request => {

    const { user } = await request.json()

    users.push(user) // fake data store

    return {
        status: 200
    }
})


// text
app.post("/user", async  request => {

    const { user } = await request.text()

    users.push(user) // fake data store

    return {
        status: 200
    }
})

// formData // multipart as well
app.post("/user/:di", async  request => {

    const formData = await request.formData()

    users[request.params.id].userName = formData.get("userName")

    return {
        status: 200
    }
})