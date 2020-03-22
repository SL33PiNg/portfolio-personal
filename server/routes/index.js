const UserController = require('../controllers/userController')
const isAuth = require('../middleware/isAuth')
const users = require('./users')
const profile = require('./profile')
const admin = require('./admin')
const select = require('./select')
const award = require('./award')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => res.send('Home APIs'))
router.post('/login', UserController.login)
router.post('/logout', (req, res) => {
  return res.json({ message: 'ok' })
})

router.use('/users', isAuth, users)
router.use('/profile', profile)
router.use('/select', select)
router.use('/admin', admin)
router.use('/award', award)

module.exports = router
