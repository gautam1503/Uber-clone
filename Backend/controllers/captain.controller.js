const captainModel = require("../models/captain.model")
const captainService = require("../services/captain.service")
const { validationResult } = require("express-validator")
const blacklistTokenModel = require("../models/blacklistToken.model")

module.exports.registerCaptain = async (req, res, next) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { fullname, email, password, vehicle } = req.body
  const isCaptainAlreadyExists = await captainModel.findOne({email})
  if(isCaptainAlreadyExists) {
    return res.status(400).json({ message: "Captain already exists" })
  }
  
  const captain = await captainService.createCaptain({
     fullname:{
      firstname: fullname.firstname,
      lastname: fullname.lastname
     }, 
     email,
      password: password, // 👈 Pass plain password, let service hash it or if you want to parse here than remove the password parsing from the service
      vehicle:{
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
      } })
  
  const token = captain.generateAuthToken();
  
  res.status(201).json({ message: "Captain registered successfully", captain , token});
}


module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body
  const captain = await captainService.findCaptainByEmail(email)
  if(!captain) {
    return res.status(401).json({ message: "Invalid email or password" })
  }
  console.log("captain",captain)
  const isPasswordValid = await captain.comparePassword(password)
  if(!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" })
  }
  console.log("isPasswordValid",isPasswordValid)
  const token = captain.generateAuthToken()
  res.cookie("token", token)
  res.status(200).json({ message: "Captain logged in successfully", captain, token })
}


module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ message: "Captain profile fetched successfully", captain: req.captain })
}

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1]
  await blacklistTokenModel.create({token})
  res.clearCookie("token")
  res.status(200).json({ message: "Captain logged out successfully" })
}