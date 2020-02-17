const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'pictemp/')
  },
  filename: (req, file, cb) => {
    cb(null, req.user.id + path.extname(file.originalname))
  }
})
const uploadAvatar = multer({ storage })

module.exports = uploadAvatar
