const userModel = require("../models/user.model")
const captainModel = require("../models/captain.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const blacklistTokenModel = require("../models/blacklistToken.model")


module.exports.authUser = async (req, res, next) => {
  let token = req.cookies.token
  
  // If no token in cookies, check Authorization header
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(" ")[1]
    }
  }
  
  if(!token){
    return res.status(401).json({message: "Unauthorized - No token provided"})
  }
  const isBlacklisted = await blacklistTokenModel.findOne({token})
  if(isBlacklisted){
    return res.status(401).json({message: "Unauthorized - Token is blacklisted"})
  }



  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded._id)
    if(!user){
      return res.status(401).json({message: "Unauthorized - Invalid token"})
    }
    req.user = user
    return next()
  }catch(error){
    return res.status(401).json({message: "Unauthorized - Invalid token"})
  }
}


module.exports.authCaptain = async (req, res, next) => {
  let token = req.cookies.token
  console.log("🔍 Token from cookies:", token)
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(" ")[1]
    }
  }
  if(!token){
    return res.status(401).json({message: "Unauthorized - No token provided"})
  }
  const isBlacklisted = await blacklistTokenModel.findOne({token})
  if(isBlacklisted){
    return res.status(401).json({message: "Unauthorized - Token is blacklisted"})
  }
  try{
    console.log("In the try====")
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("🔍 Decoded token:", decoded)
    const captain = await captainModel.findById(decoded._id)
    console.log("🔍 Captain from database:", captain)
    if(!captain){
      return res.status(401).json({message: "Unauthorized - Invalid token"})
    }
    req.captain = captain
    return next()
  }catch(error){
    return res.status(401).json({message: "Unauthorized - Invalid token"})
  }
}