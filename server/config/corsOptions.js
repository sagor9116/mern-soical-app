const allowedOrigins = require("./allowedOrigin")

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("not allowed by cors"))
    }
  },
  credential: true,
  optionsSuccessStatus: 200,
}

module.exports = corsOptions
