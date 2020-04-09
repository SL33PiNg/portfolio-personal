const mongoose = require('mongoose')

const aminLogSchema = new mongoose.Schema({ 
  adminName:String,
  userName:String,
  userID: String,
  userFirstnameTH:String,
  userLastnameTH: String,
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
