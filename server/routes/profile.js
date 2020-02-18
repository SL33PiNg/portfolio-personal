const ProfileController = require('../controllers/profileController')
const express = require('express')
const router = express.Router()

router.get('/', ProfileController.getAllUserProfile)
router.get('/:username', ProfileController.getProfileByUsername)

module.exports = router
