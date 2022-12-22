// configure dotenv file
require("dotenv").config()

const express = require("express")
const path = require("path")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const errorHandler = require("./middleware/errorHandler")
const { logMiddleware, logEvents } = require("./middleware/logger")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/mongoDbConnection")

const app = express()
app.use(express.json())
app.use(cors(corsOptions))

// mondoDB
mongoose.set("strictQuery", false)
connectDB()

// log the files and err
app.use(logMiddleware)

// look for the static files
app.use("/", express.static(path.join(__dirname, "public")))

// set up the splash folder for api
app.use("/", require("./routes/root"))

// page not found
app.all("*", (req, res) => {
  res.status(404)
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"))
  } else if (req.accepts("json")) {
    res.json("404 not found")
  } else {
    res.type("txt").send("404 not found")
  }
})

// custom error handler
app.use(errorHandler)

// 3rd party middleware
app.use(cookieParser())

//port
const PORT = process.env.PORT || 3600

// mongoDB connection
mongoose.connection
  .once("open", () => {
    console.log("Connected to MongoDB")
    // starting the development server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .on("error", (error) => {
    console.log(error)
    logEvents(
      `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
      "mongoErrLog.log"
    )
  })
