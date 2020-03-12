const UserModel = require('../models/User')
const AwardModel = require('../models/award')

exports.addAdmin = async (req, res) => {
  const { id } = req.params
  try {
    const user = await UserModel.findByIdAndUpdate(id, { roles: ['USER','ADMIN'] }, { new: true })
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'unknow error' })
  }
}

exports.removeAdmin = async (req, res) => {
  const { id } = req.params
  try {
    const user = await UserModel.findByIdAndUpdate(id, { roles: ['USER'] }, { new: true })
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'unknow error' })
  }
}

exports.allowPublic = async (req, res) => {
  const { id } = req.params
  try {
    const user = await UserModel.findByIdAndUpdate(id, { isPublic: true }, { new: true })
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'unknow error' })
  }
}

exports.NotAllowedPublic = async (req, res) => {
  const { id } = req.params
  try {
    const user = await UserModel.findByIdAndUpdate(id, { isPublic: false }, { new: true })
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'unknow error' })
  }
}

exports.allowActive = async (req, res) => {
  const { id } = req.params
  try {
    const user = await UserModel.findByIdAndUpdate(id, { isActive: true }, { new: true })
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'unknow error' })
  }
}

exports.NotAllowedActive = async (req, res) => {
  const { id } = req.params
  try {
    const user = await UserModel.findByIdAndUpdate(id, { isActive: false }, { new: true })
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'unknow error' })
  }
}


exports.getAllUserProfile = async (req, res) => {
  try {
    const users = await UserModel.find({ username: { $ne: 'admin' } }, { password: 0 })
    return res.send(users)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.getAward = async (req, res) => {
  try {
    const award = await AwardModel.find({ highlights: true })
    return res.json(award)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

