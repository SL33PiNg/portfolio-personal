const UserModel = require('../models/User')

exports.getAllUserProfile = async (req, res) => {
  try {
    const users = await UserModel.find({ username: { $ne: 'admin' } }, { password: 0 })
    return res.send(users)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.getProfileByUsername = async (req, res) => {
  const { username } = req.params
  if (username === 'admin') {
    return res.status(403).json({ status: 403, message: 'no permission' })
  }
  try {
    const profile = await UserModel.findOne({ username })
    return res.send(profile)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}
