const express = require("express")
const path = require("path")

const app = express()

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

//port
const PORT = process.env.PORT || 3600

// starting the development server
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`)
})
