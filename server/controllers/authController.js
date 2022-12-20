import bcrypt from "bcrypt"
import User from "../models/User"

// REGISTER USER
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body

    // creating secure password
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)

    // creating new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    })

    // saving user and getting successful response
    const savedUser = await newUser.save()
    const successResponse = res.status(201).json(savedUser)
    return successResponse
  } catch (error) {
    // logging error message user registration fails
    const errorResponse = res.status(501).json({ error: error.message })
    return errorResponse
  }
}
