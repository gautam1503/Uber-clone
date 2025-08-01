const captainModel = require("../models/captain.model")

module.exports.createCaptain = async (captainData) => {
  const { fullname, email, password, vehicle } = captainData
  
  if(!fullname.firstname || !email || !password || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
    throw new Error("All fields are required")
  }
  const existingCaptain = await captainModel.findOne({email})
  if(existingCaptain) {
    throw new Error("Captain already exists")
  }
  const hashedPassword = await captainModel.hashPassword(password)
  const captain = await captainModel.create({ fullname:{
    firstname: fullname.firstname,
    lastname: fullname.lastname
  }, email,
   password: hashedPassword,
    vehicle:{
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType
  } })
  return captain
}

module.exports.findCaptainByEmail = async (email) => {
  return await captainModel.findOne({email}).select('+password')
}