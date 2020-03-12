const uploadAvatar = require('../middleware/uploadAvatar')
const UserController = require('../controllers/userController')
const AddAward = require('../controllers/awardController')
const express = require('express')

const router = express.Router()

router.get('/', UserController.getCurrentUser)
router.patch('/', UserController.updatePersonalInfo)

router.patch('/avatar', uploadAvatar.single('avatar'), UserController.updateAvatar)

router.post('/workinfo', UserController.addUserWorkdInfoById)
router.delete('/workinfo/:id', UserController.deleteWorkinfoByIndex)

router.post('/studyinfo', UserController.addUserEducationInfoById)
router.delete('/studyinfo/:id', UserController.deleteEducationInfoByIndex)

router.post('/certificateinfo', UserController.addUsercertificateInfoById)
router.delete('/certificateinfo/:id', UserController.deletecertificateInfoByIndex)

<<<<<<< HEAD

=======
router.post('/award', AddAward.addAward)
>>>>>>> 6f9d71df38415f37046d0340cab96a75eb4d3bba

module.exports = router
