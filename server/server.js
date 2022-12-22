// configure dotenv file
require("dotenv").config()

// third party imports
const express = require("express")
const path = require("path")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const helmet = require("helmet")
const morgan = require("morgan")
const multer = require("multer")

// custom imports
const errorHandler = require("./middleware/errorHandler")
const { logMiddleware, logEvents } = require("./middleware/logger")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/mongoDbConnection")

// initializing app and using it
const app = express()
app.use(express.json())
app.use(cors(corsOptions))

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))

app.use(morgan("common"))

// log the files and err
app.use(logMiddleware)

// handling static files
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

// File storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/assets/")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

// custom error handler
app.use(errorHandler)

// 3rd party middleware
app.use(cookieParser())

//port
const PORT = process.env.PORT || 3600

// mondoDB
mongoose.set("strictQuery", false)
connectDB()

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
