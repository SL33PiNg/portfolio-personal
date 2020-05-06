const ProfileController = require('../controllers/profileController')
const uploadImage = require('../middleware/uploadAward')
const express = require('express')
const router = express.Router()

router.get('/', ProfileController.getAllUserProfile)
router.get('/:username', ProfileController.getProfileByUsername)

router.post('/report', ProfileController.addReport)

router.post('/search', ProfileController.search)
router.post('/advancedSearch', ProfileController.advancedSearch)

router.post('/image',uploadImage.single('report'), ProfileController.uploadImage )

module.exports = router
