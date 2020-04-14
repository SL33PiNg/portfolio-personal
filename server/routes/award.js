const AwardController = require('../controllers/awardController')
const uploadAward =require('../middleware/uploadAward')
const express = require('express')

const router = express.Router()

router.get('/', AwardController.getMarkAward)
router.post('/image',uploadAward.single('award'), AwardController.uploadImage )

module.exports = router
