const mongoose = require('mongoose')

const userLogSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  action:String,
  msg:String,
  docID:String,
  date: {
    type: Date, 
    default: Date.now
  },
  ip:String,
})
const userLog = mongoose.model('userLog', userLogSchema)
module.exports = userLog