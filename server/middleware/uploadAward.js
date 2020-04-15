const path = require('path')
const { v4 } = require('uuid')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'pictemp/')
  },
  filename: (req, file, cb) => {
    const newName = v4() +path.extname(file.originalname)
    cb(null, newName)
  }
})
const uploadAvatar = multer({ storage })

module.exports = uploadAvatar
