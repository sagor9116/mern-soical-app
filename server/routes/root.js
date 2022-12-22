const express = require("express")
const path = require("path")

const router = express.Router()

// creating regex path
router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"))
})

module.exports = router
