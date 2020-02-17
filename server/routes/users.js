const UserModel = require('../models/User')
const uploadAvatar = require('../middleware/uploadAvatar')
const UserController = require('../controllers/userController')
const express = require('express')

const router = express.Router()

router.get('/', UserController.getCurrentUser)
router.patch('/', UserController.updatePersonalInfo)

router.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  UserController.updateAvatar
)

router.get('/:username', UserController.getUserById)

router.post('/:username', async (req, res) => {
  const { username } = req.params
  const user = await UserModel.findOneAndUpdate(
    { username },
    { ...req.body },
    { new: true }
  )
  res.send(user)
})

router.get('/:username/workinfo', (req, res) => {
  return res.send('work info path')
})

router.post('/:username/workinfo', UserController.updateUserWorkdInfoById)
router.delete('/:username/workinfo/:id', UserController.deleteWorkinfoByIndex)

module.exports = router
