const AwardController = require('../controllers/awardController')
const express = require('express')

const router = express.Router()

router.get('/', AwardController.getMarkAward)

module.exports = router
