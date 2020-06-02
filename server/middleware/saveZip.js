const path = require('path')
const fs = require('fs')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'temp/')
  },
  filename: (req, file, cb) => {
    if(fs.existsSync(path.resolve('temp', file.originalname))){
      fs.rmdirSync(path.resolve('temp', file.originalname))
    }
    cb(null, file.originalname)
  }
})
const uploadAvatar = multer({ storage })

module.exports = uploadAvatar
