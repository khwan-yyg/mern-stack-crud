require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')

const cors = require("cors");

// express app
const app = express()

app.use(express.json());

app.use(cors(
    {
        origin: ["https://mern-stack-crud-and-search-app-frontend.vercel.app/"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

app.use("/posts", require("./routes/post"));

// routes
app.get('/', (req, res) => {
    res.json({ mssg: 'Welcome to the app' })
    res.json("Hello");
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