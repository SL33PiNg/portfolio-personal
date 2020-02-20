const uploadAvatar = require('../middleware/uploadAvatar')
const UserController = require('../controllers/userController')
const express = require('express')

const router = express.Router()

router.get('/', UserController.getCurrentUser)
router.patch('/', UserController.updatePersonalInfo)

router.patch('/avatar', uploadAvatar.single('avatar'), UserController.updateAvatar)

router.post('/workinfo', UserController.addUserWorkdInfoById)
router.delete('/workinfo/:id', UserController.deleteWorkinfoByIndex)

module.exports = router
