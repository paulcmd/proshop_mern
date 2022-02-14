import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]   //Removing Bearer from the token

      console.log('token: ', token)
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET)  //decoded contains the id of the user

      console.log('decoded jwt from AuthMiddleware: ', decoded)

      req.user = await User.findById(decoded.id).select('-password')   //user is added to the req object. -password excludes the password from the user object

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }

/* 
Authentication is using email and password to create a 
*/