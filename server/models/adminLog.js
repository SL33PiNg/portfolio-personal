const mongoose = require('mongoose')

const aminLogSchema = new mongoose.Schema({ 
  adminID:{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  userLog:String,
  information:String,
  msg:String,
  logType:Number,
  date: {
    type: Date, 
    default: Date.now
  }
})
const aminLog = mongoose.model('aminLog', aminLogSchema)
module.exports = aminLog
