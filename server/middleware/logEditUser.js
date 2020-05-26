const userLog = require('../models/userLog')
module.exports = async (req, res, next) => {
  const { id } = req.user
  const {msg, action} = req.body
  console.log(req.ip)
  try {
    await userLog.create({
      userID: id,
      msg,
      action,
      ip: req.ip,
    })
  } catch (error) {
    
  }
  next()
}