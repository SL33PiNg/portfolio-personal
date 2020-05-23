const uploadAvatar = require('../middleware/uploadAvatar')
const UserController = require('../controllers/userController')
const AddAward = require('../controllers/awardController')
const userLog = require('../middleware/logEditUser')
const express = require('express')

const router = express.Router()

router.get('/', UserController.getCurrentUser)
router.patch('/',[userLog] , UserController.updatePersonalInfo)

router.patch('/avatar', uploadAvatar.single('avatar'), UserController.updateAvatar)

router.post('/workinfo', UserController.addUserWorkdInfoById)
router.delete('/workinfo/:id', UserController.deleteWorkinfoByIndex)
router.patch('/workinfo', UserController.editUserWorkdInfoById)

router.post('/studyinfo', UserController.addUserEducationInfoById)
router.delete('/studyinfo/:id', UserController.deleteEducationInfoByIndex)
router.patch('/studyinfo', UserController.editUserEducationInfoById)

router.post('/certificateinfo', UserController.addUsercertificateInfoById)
router.delete('/certificateinfo/:id', UserController.deletecertificateInfoByIndex)
router.patch('/certificateinfo', UserController.editUsercertificateInfoById)

router.post('/award', AddAward.addAward)
router.get('/award', AddAward.getAward)
router.delete('/award/:id', AddAward.delAward)
router.patch('/award', AddAward.updateAward)

router.get('/highlight/:id/:status', UserController.highlight)
router.get('/backup', UserController.backup)
router.get('/download/:filename', UserController.sendFile)


module.exports = router
