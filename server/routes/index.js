const UserController = require('../controllers/userController')
const isAuth = require('../middleware/isAuth')
const users = require('./users')
const profile = require('./profile')
const select = require('./select')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send('Home API'))
router.post('/login', UserController.login)
router.post('/logout', (req, res) => {
  return res.json({ message: 'ok' })
})

router.use('/users', isAuth, users)
router.use('/profile', profile)
router.use('/select', select)

module.exports = router
