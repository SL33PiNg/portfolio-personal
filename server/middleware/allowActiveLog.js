const adminLog = require('../models/adminLog')
module.exports = async (req, res, next) => {
  const { id } = req.params
  const { msg } = req.body
  const { username } = req.user
  const userLog = req.path.startsWith('/allowActive')?'เปิดการใช้งานบัญชี':'ปิดการใช้งานบัญชี' 
  console.log(req.path)
  console.log(req.body)
  try {
    await adminLog.create({
      msg,
      logType: 3,
      userLog,
      adminName: username,
      userID: id
    })
  } catch (error) {
    
  }
  next()
}