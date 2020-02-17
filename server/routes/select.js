const select = require('../controllers/selectController')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send('select menu home'))

router.get('/department', select.getAlldepartment)
router.post('/department', select.addDepartment)
router.patch('/department', select.editDepartment)
router.delete('/department/:_id', select.delDepartment)

router.get('/expertist', select.getAllExpertist)
router.post('/expertist', select.addExpertist)
router.patch('/expertist', select.editExpertist)
router.delete('/expertist/:_id', select.delExpertist)

router.post('/expertist/sub', select.addSubExpertist)
router.patch('/expertist/sub', select.updateSubExpertist)
router.delete('/expertist/:_id/:subId', select.deleteSubExpertist)

router.get('/positionOcsc', select.getAllPositionOcsc)
router.post('/positionOcsc', select.addPositionOcsc)
router.patch('/positionOcsc', select.editPositionOcsc)
router.delete('/positionOcsc/:_id', select.delPositionOcsc)

router.post('/positionOcsc/sub', select.addSubPositionOcsc)
router.patch('/positionOcsc/sub', select.updateSubPositionOcsc)
router.delete('/positionOcsc/:_id/:subId', select.deleteSubPositionOcsc)

module.exports = router
