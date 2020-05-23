const userLog = require('../models/userLog')
module.exports = async (req, res, next) => {
  const { id } = req.user
  let action = ''
  let docID = ''
  switch (req.method) {
    case 'PATCH':
      action = 'แก้ไข'
      docID = req.body._id
      break;
    case 'DELETE':
      action = 'ลบ'
      docID = req.params.id
      break;
  }  
  let msg = ''
  if( req.path.search('/workinfo') > -1 ){
    msg = 'ข้อมูลประวัติการทำงาน'
  }else if(req.path.search('/studyinfo') > -1 ){
    msg = 'ข้อมูลประวัติการศึกษา'
  }else if(req.path.search('/certificateinfo') > -1 ){
    msg = 'ข้อมูลใบรับรอง'
  }else if(req.path.search('/award') > -1 ){
    msg = 'ข้อมูลผลงาน'
  }
  try {
    if(action && msg)
    await userLog.create({
      userID: id,
      action,
      msg,
      ip: req.ip,
      docID,
    })
  } catch (error) {
    
  }
  next()
}