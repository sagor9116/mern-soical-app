const express = require("express")
const path = require("path")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const errorHandler = require("./middleware/errorHandler")
const { logMiddleware } = require("./middleware/logger")
const corsOptions = require("./config/corsOptions")

const app = express()
app.use(express.json())
app.use(cors(corsOptions))

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

// starting the development server
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`)
})
