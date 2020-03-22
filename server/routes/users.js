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

router.post('/award', AddAward.addAward)
router.get('/award', AddAward.getAward)
router.delete('/award/:id', AddAward.delAward)

router.get('/highlight/:id/:status', UserController.highlight)

module.exports = router
