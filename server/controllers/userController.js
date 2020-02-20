const fs = require('fs')
const path = require('path')
const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')
const sharp = require('sharp')
sharp.cache(false)
exports.getAllUser = async (req, res) => {
  return res.json(await UserModel.find().exec())
}

exports.login = async (req, res) => {
  let user
  const { username, password } = req.body
  if (username === 'admin') {
    user = await UserModel.findOne({ username }, { _id: 1, password: 1, roles: 1 })
    if (!user) {
      user = await UserModel.create({ username, password, roles: [ 'ADMIN' ] })
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }
  } else if (rmuttLogin(username, password)) {
    user = await UserModel.findOne({ username })
    if (!user) {
      user = await UserModel.create({ username })
    }
  } else {
    return res.status(401).json({ message: 'Invalid username or password' })
  }

  const { id, roles } = user
  const token = jwt.sign({ id, roles, username }, process.env.TOKEN_SECRET, {
    expiresIn: '1h'
  })
  res.status(200).json({
    token
  })
}

exports.addUserWorkdInfoById = async (req, res) => {
  const work = { ...req.body }
  try {
    const result = await UserModel.findByIdAndUpdate(req.user.id, { $push: { workinfo: work } }, { new: true })

    return res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

exports.deleteWorkinfoByIndex = async (req, res) => {
  const { id } = req.params
  try {
    const result = await UserModel.findByIdAndUpdate(req.user.id, { $pull: { workinfo: { _id: id } } }, { new: true })
    res.json(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id, { password: 0 })
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'internal server error' })
  }
}

exports.updatePersonalInfo = async (req, res) => {
  const { id } = req.user
  try {
    const user = await UserModel.findByIdAndUpdate(id, { ...req.body }, { upsert: true, new: true })
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'unknow error' })
  }
}

exports.updateAvatar = async (req, res) => {
  const { id } = req.user
  const filename = id + '.jpg'
  console.log(req.file.path)
  try {
    await sharp(req.file.path).jpeg({ quality: 100 }).toFormat('jpeg').toFile(path.resolve('avatar', filename))
    fs.unlinkSync(req.file.path)
    const result = await UserModel.findByIdAndUpdate(id, { avatar: filename })
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.addUserEducationInfoById = async (req, res) => {
  const education = { ...req.body }
  try {
    const result = await UserModel.findByIdAndUpdate(req.user.id, { $push: { educationinfo: education } }, { new: true })

    return res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

function rmuttLogin (username, password) {
  if (username === 'tao' && password === '123') return true
  else if (username === 'art' && password === '123') return true
  else if (username === 'nook' && password === '123') return true
  else return false
}
