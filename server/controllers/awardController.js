const path = require('path')
const fs = require('fs')
const UserModel = require('../models/User')
const AwardModel = require('../models/award')
const sharp = require('sharp')

exports.addAward = async (req, res) => {
  const { id } = req.user
  try {
    const award = await AwardModel.create({ user_id: id, ...req.body })
    const result = await UserModel.findByIdAndUpdate(id, { $push: { awardList: award._id } }, { new: true })
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.getAward = async (req, res) => {
  const { id } = req.user
  try {
    const user = await AwardModel.find({ user_id: id }).sort({ eventYear: -1 })
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'internal server error' })
  }
}

exports.delAward = async (req, res) => {
  const { id } = req.user
  try {
    await AwardModel.findByIdAndRemove(req.params.id)
    const user = await UserModel.findByIdAndUpdate(id, { $pull: { awardList: req.params.id } })
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'internal server error' })
  }
}

exports.getMarkAward = async (req, res) => {
  try {
    const result = await AwardModel.find({ highlights: true, markedAward: true })
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.uploadImage = async (req, res) => {
  const image =  sharp(req.file.path)
  try {
    const metadata = await image.metadata()
    console.log(metadata)
    if(metadata.height > metadata.width ){
      image.resize({height: 500}).toFile(path.resolve('award', req.file.filename))
    }else{
      image.resize({width: 870}).toFile(path.resolve('award', req.file.filename))
    }
    fs.unlinkSync(req.file.path)
  } catch (error) {
    
  }
  res.json({
    file: req.file.filename
  })
}