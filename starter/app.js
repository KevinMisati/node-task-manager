const connectDb  = require("./db/connect")
const express = require("express")
const app = express()
const tasks = require("./routes/tasks")
require('dotenv').config()
const notFound = require("./middleware/notFound")
const errorHandlerMiddleware = require("./middleware/errorHandler")

app.use(express.static("./public"))
app.use(express.json())

app.use("/api/v1/tasks",tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 3000

const start = async () => {
    try{

        await connectDb(process.env.MONGO_URI)
        app.listen(port,console.log(`Listening on port ${port}`))
    }
    catch{ (error) => {
        console.log(error)
    }

    }
}

start()