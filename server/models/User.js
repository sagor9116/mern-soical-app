const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 40,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 40,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 60,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewdProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)
module.exports = User
