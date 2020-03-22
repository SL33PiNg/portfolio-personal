const addAdmin = require('../controllers/adminController')
const express = require('express')
const router = express.Router()

router.get('/addAdmin/:id' , addAdmin.addAdmin)
router.get('/removeAdmin/:id' , addAdmin.removeAdmin)

router.get('/allowPublic/:id' , addAdmin.allowPublic)
router.get('/NotAllowedPublic/:id' , addAdmin.NotAllowedPublic)

router.get('/allowActive/:id' , addAdmin.allowActive)
router.get('/NotAllowedActive/:id' , addAdmin.NotAllowedActive)


router.get('/userProfile' , addAdmin.getAllUserProfile)

router.get('/award' , addAdmin.getAward)

router.get('/markedAward/:id/:status' , addAdmin.markedAward)
// router.get('/statusActive/:id' , addAdmin.statusActive)

module.exports = router