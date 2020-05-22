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
    if(metadata.height > metadata.width ){
      await image.resize({height: 1365}).toFile(path.resolve('award', req.file.filename))
    }else{
      await image.resize({width: 2048}).toFile(path.resolve('award', req.file.filename))
    }
    fs.unlinkSync(req.file.path)
  } catch (error) {
    
  }
  res.json({
    file: req.file.filename
  })
}

exports.getAwardByID = async (req, res) => {
  const { id } = req.params
  try {
    const result = await AwardModel.findById( id )
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.updateAward = async (req, res) => {
  const { _id } = req.body
  try {
    const result = await AwardModel.findByIdAndUpdate( _id, req.body )
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}