const UserModel = require('../models/User')
const AwardModel = require('../models/award')
const ReportModel = require('../models/report')

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
    const award = await AwardModel.find({ highlights: true }).sort({ eventYear: -1 })
    return res.json(award)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.markedAward = async (req, res) => {
  const { id, status } = req.params
  try {
    if(status === 'true' ){
      await AwardModel.findByIdAndUpdate(id, { markedAward: true })
    }
    else{
      await AwardModel.findByIdAndUpdate(id, { markedAward: false })
    }
    return res.json({})
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'internal server error' })
  }
}

exports.getAllReport = async (req, res) => {
  try {
    const reports = await ReportModel.find({}).sort({ status: 1, date: 1 })
    return res.send(reports)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.allowReport = async (req, res) => {
  const { id } = req.params
  try {
    const user = await ReportModel.findByIdAndUpdate(id, { status: true }, { new: true })
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'unknow error' })
  }
}

exports.NotAllowedReport = async (req, res) => {
  const { id } = req.params
  try {
    const user = await ReportModel.findByIdAndUpdate(id, { status: false }, { new: true })
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'unknow error' })
  }
}

exports.delReportsById = async (req, res) => {
  const { id } = req.params
  try {
    const result = await ReportModel.findByIdAndDelete({ _id: id })
    res.json(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}