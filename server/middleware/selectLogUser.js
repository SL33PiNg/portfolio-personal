const userLog = require('../models/userLog')
module.exports = async (req, res, next) => {
  const { id } = req.user
  const action = req.method === "POST"?'เพิ่ม':'ลบ'
  let msg = ''
  if( req.path.search('/workinfo') > -1 ){
    msg = '/แก้ไขข้อมูลประวัติการทำงาน'
  }else if(req.path.search('/studyinfo') > -1 ){
    msg = '/แก้ไขข้อมูลประวัติการศึกษา'
  }else{
    msg = '/แก้ไขข้อมูลใบรับรอง'
  }
  try {
    await userLog.create({
      userID: id,
      userLog: action+msg,
      ip: req.ip,
    })
  } catch (error) {
    
  }
  next()
}