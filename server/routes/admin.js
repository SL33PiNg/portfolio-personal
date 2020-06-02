const addAdmin = require('../controllers/adminController')
const isAuth = require('../middleware/isAuth')
const logAdmin = require('../middleware/logEditAdmin')
const logAllow = require('../middleware/allowPublicLog')
const logActive = require('../middleware/allowActiveLog')
const saveZip = require('../middleware/saveZip')
const extractZip = require('../middleware/extractZip')
const express = require('express')
const router = express.Router()

router.get('/addAdmin/:id',[isAuth, logAdmin] , addAdmin.addAdmin)
router.get('/removeAdmin/:id',[isAuth, logAdmin]  , addAdmin.removeAdmin)

router.post('/allowPublic/:id',[isAuth, logAllow] , addAdmin.allowPublic)
router.post('/NotAllowedPublic/:id',[isAuth, logAllow]  , addAdmin.NotAllowedPublic)

router.post('/allowActive/:id',[isAuth, logActive] , addAdmin.allowActive)
router.post('/NotAllowedActive/:id',[isAuth, logActive] , addAdmin.NotAllowedActive)


router.get('/userProfile' , addAdmin.getAllUserProfile)

router.get('/award' , addAdmin.getAward)

router.get('/markedAward/:id/:status' , addAdmin.markedAward)
// router.get('/statusActive/:id' , addAdmin.statusActive)

router.get('/reports' , addAdmin.getAllReport)
router.get('/allowReport/:id' , addAdmin.allowReport)
router.get('/NotAllowedReport/:id' , addAdmin.NotAllowedReport)
router.delete('/delReports/:id' , addAdmin.delReportsById)

router.get('/history' , addAdmin.getAllLog)
router.get('/historyUserEdit' , addAdmin.getAllLogUser)

router.get('/blackup' , addAdmin.blackupData)
router.get('/backuplist', addAdmin.getBackup)
router.post('/restore', [saveZip.single('restore'), extractZip], addAdmin.restore)

router.get('/backupDownload', addAdmin.downloadBackup)
module.exports = router