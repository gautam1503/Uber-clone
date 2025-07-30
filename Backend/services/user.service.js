const userModel = require("../models/user.model")


module.exports.createUser = async (userData) => {
  const {email, password, fullname} = userData
  if(!email || !password || !fullname){
    throw new Error("All fields are required")
  }
  const existingUser = await userModel.findOne({email})
  if(existingUser){
    throw new Error("User already exists")
  }
  const user = new userModel({
    email,
    password,
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname
    }
  })
  return await user.save()
}

module.exports.findUserByEmail = async (email) => {
  return await userModel.findOne({email}).select('+password')
}