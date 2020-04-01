const ProfileController = require('../controllers/profileController')
const express = require('express')
const router = express.Router()

router.get('/', ProfileController.getAllUserProfile)
router.get('/:username', ProfileController.getProfileByUsername)

router.post('/report', ProfileController.addReport)

router.post('/search', ProfileController.search)

module.exports = router
