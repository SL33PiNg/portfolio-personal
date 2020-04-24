const uploadAvatar = require('../middleware/uploadAvatar')
const UserController = require('../controllers/userController')
const AddAward = require('../controllers/awardController')
const userLog = require('../middleware/logEditUser')
const selectLog = require('../middleware/selectLogUser')
const express = require('express')

const router = express.Router()

router.get('/', UserController.getCurrentUser)
router.patch('/',[userLog] , UserController.updatePersonalInfo)

router.patch('/avatar', uploadAvatar.single('avatar'), UserController.updateAvatar)

router.post('/workinfo',[selectLog], UserController.addUserWorkdInfoById)
router.delete('/workinfo/:id',[selectLog], UserController.deleteWorkinfoByIndex)

router.post('/studyinfo',[selectLog], UserController.addUserEducationInfoById)
router.delete('/studyinfo/:id',[selectLog], UserController.deleteEducationInfoByIndex)

router.post('/certificateinfo',[selectLog], UserController.addUsercertificateInfoById)
router.delete('/certificateinfo/:id',[selectLog], UserController.deletecertificateInfoByIndex)

router.post('/award', AddAward.addAward)
router.get('/award', AddAward.getAward)
router.delete('/award/:id', AddAward.delAward)

router.get('/highlight/:id/:status', UserController.highlight)
router.get('/backup', UserController.backup)
router.get('/download/:filename', UserController.sendFile)


module.exports = router
