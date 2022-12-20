import mongoose from "mongoose"

const { Schema } = mongoose

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 60,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 60,
    },
    email: {
      type: String,
      unique: true,
      required: true,
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
    impression: Number,
  },
  { timestamps: true }
)

const User = mongoose.model("User", UserSchema)
export default User
