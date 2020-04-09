const adminLog = require('../models/adminLog')
module.exports = async (req, res, next) => {
  const { id } = req.params
  const { msg } = req.body
  const { username } = req.user
  const userLog = req.path.startsWith('/addAdmin')?'เพิ่มสิทธิ์แอดมิน':'ลบสิทธิ์แอดมิน' 
  console.log(req.path)
  try {
    await adminLog.create({
      msg,
      logType: 1,
      userLog,
      adminName: username,
      userID: id
    })
  } catch (error) {
    
  }
  next()
}