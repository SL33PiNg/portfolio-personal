const fs = require('fs')
const path = require('path')
const UserModel = require('../models/User')
const UserLogModel = require('../models/userLog')
const AwardModel = require('../models/award')
const backupUser = require('../utils/backupUser')
const userLog = require('../models/userLog')
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
      return res.status(401).json({ message: '(admin)Invalid username or password' })
    }
    if (!user) {
      return res.status(401).json({ message: '(admin)Invalid username or password' })
    }
  } else if (rmuttLogin(username, password)) {
    user = await UserModel.findOne({ username })
    if (!user) {
      user = await UserModel.create({ username })
      await userLog.create({
        userID: user._id,
        msg: 'ข้อมูลส่วนตัว',
        action: 'เพิ่ม',
        ip: req.ip,
      })
      console.log(user._id)
    }
  } else {
    return res.status(401).json({ message: 'Invalid username or password' })
  }
  
  if(user.isActive === false){
    return res.status(450).json({ message: 'user has been disable!! call to 085-531-0522' })
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
    const result = await UserModel.findByIdAndUpdate(
      req.user.id, 
      { $push: {
         workinfo: {
          $each: [ work ],
          $sort: { status:-1 ,end: 1 }
         } 
        } 
      }, 
      { new: true })
      createLog(req.user.id, work._id, 'ข้อมูลประวัติการทำงาน', req.ip)
    return res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

exports.editUserWorkdInfoById = async (req, res) => {
  const { id } = req.user
  const work  = {...req.body} 
  try {
    const result = await UserModel.updateOne(
      { _id: id, workinfo: { $elemMatch: { _id: work._id } } },
      { $set: { 'workinfo.$': work } }
    )
      res.json(result)
      console.log(result)
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
  const { user, msg } = req.body
  console.log(msg)
  try {
    const result = await UserModel.findByIdAndUpdate(id, { ...user }, { upsert: true, new: true })
    return res.json(result)
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
    const result = await UserModel.findByIdAndUpdate(
      req.user.id,
      { $push: {
         educationinfo: {
          $each: [ education ],
          $sort: { graduate: 1 }
         }
        }
      },
      { new: true }
    )
    createLog(req.user.id, education._id, 'ข้อมูลประวัติการศึกษา', req.ip)
    return res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

exports.editUserEducationInfoById = async (req, res) => {
  const { id } = req.user
  const education  = {...req.body} 
  try {
    const result = await UserModel.updateOne(
      { _id: id, educationinfo: { $elemMatch: { _id: education._id } } },
      { $set: { 'educationinfo.$': education } }
    )
      res.json(result)
      console.log(result)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

exports.deleteEducationInfoByIndex = async (req, res) => {
  const { id } = req.params
  try {
    const result = await UserModel.findByIdAndUpdate(
      req.user.id,
      { $pull: { educationinfo: { _id: id } } },
      { new: true }
    )
    res.json(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

exports.addUsercertificateInfoById = async (req, res) => {
  const certificate = { ...req.body }
  try {
    const result = await UserModel.findByIdAndUpdate(
      req.user.id, 
      { $push: { 
          certificateinfo: {
            $each: [ certificate ],
            $sort: { graduate: -1 } 
          }
        } 
      }, 
      { new: true })
      createLog(req.user.id, certificate._id, 'ข้อมูลใบรับรอง', req.ip)
    return res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

exports.editUsercertificateInfoById = async (req, res) => {
  const { id } = req.user
  const certificate  = {...req.body} 
  console.log(certificate._id)
  console.log(id)
  console.log(certificate)
  try {
    const result = await UserModel.updateOne(
      { _id:id, certificateinfo: { $elemMatch: { _id:certificate._id } } },
      { $set: { 'certificateinfo.$': certificate } }
    )
      res.json(result)
      console.log(result)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

exports.deletecertificateInfoByIndex = async (req, res) => {
  const { id } = req.params
  try {
    const result = await UserModel.findByIdAndUpdate(req.user.id, { $pull: { certificateinfo: { _id: id } } }, { new: true })
    res.json(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

function rmuttLogin (username, password) {
  if (username === 'tao' && password === '123') return true
  else if (username === 'art' && password === '123') return true
  else if (username === 'test1' && password === '123') return true
  else if (username === 'test2' && password === '123') return true
  else if (username === 'test3' && password === '123') return true
  else if (username === 'test4' && password === '123') return true
  else if (username === 'test5' && password === '123') return true
  else return false
}

exports.highlight = async (req, res) => {
  const { id, status } = req.params
  try {
    if(status === 'true' ){
      await AwardModel.findByIdAndUpdate(id, { highlights: true })
    }
    else{
      await AwardModel.findByIdAndUpdate(id, { highlights: false })
    }
    return res.json({})
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'internal server error' })
  }
}

exports.backup = async (req, res) => {
  const { id } = req.user
  try {
    const filePath = await backupUser(id)
    console.log(filePath)
    res.download(filePath)
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'internal server error' })
  }
}

exports.sendFile =  (req, res) => {
  const { filename } = req.params
  try {
    const filePath = path.resolve('zip', filename)
    sleep(2000)
    res.download(filePath)
    res.end()
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'internal server error' })
  }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

async function createLog(userID, docID, msg, ip){
   try {
    await UserLogModel.create({
      userID,
      docID,
      msg,
      action:'เพิ่ม',
      ip,
      
    })
  } catch (error) {
    
  }
}