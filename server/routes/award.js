const AwardController = require('../controllers/awardController')
const uploadAward =require('../middleware/uploadAward')
const express = require('express')

const router = express.Router()

router.get('/', AwardController.getMarkAward)
router.post('/image',uploadAward.single('award'), AwardController.uploadImage )

router.get('/detail/:id', AwardController.getAwardByID)

module.exports = router
