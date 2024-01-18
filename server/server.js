require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')

// express app
const app = express()

app.use(express.json());

app.use("/posts", require("./routes/post"));

// routes
app.get('/', (req, res) => {
    res.json({ mssg: 'Welcome to the app' })
})

// connect to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log('connected to database')
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })