const mongoose = require("mongoose")

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "1d",
  },
})

const blacklistTokenModel = mongoose.model("BlacklistToken", blacklistTokenSchema)
module.exports = blacklistTokenModel