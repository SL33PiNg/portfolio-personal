const { exec } = require('child_process')
const util = require('util');
const Aexec = util.promisify(require('child_process').exec);
const fs = require('fs')
const path = require('path')
const UserModel = require('../models/User')
const AwardModel = require('../models/award')
const ReportModel = require('../models/report')
const adminLog = require('../models/adminLog')
const userLog = require('../models/userLog')
const archiver = require('archiver')
archiver.registerFormat('zip-encryptable', require('archiver-zip-encryptable'))
const fse = require('fs-extra')
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

exports.getAllLog = async (req, res) => {
  try {
    const result = await adminLog.find().populate({ path: 'userID', select: 'personalInfo' }).populate({ path: 'adminID', select: 'personalInfo' })
    res.json(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

exports.getAllLogUser = async (req, res) => {
  try {
    const result = await userLog.find().populate({ path: 'userID', select: 'personalInfo username' })
    res.json(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

exports.blackupData = async (req, res) => {
  const now = new Date()
  const dd = now.getDate()
  const mm = Intl.DateTimeFormat('en-US',{month:'long'}).format(now)
  const yy = now.getFullYear()
  const folderName = `${yy}_${mm}_${dd}`
  const backupPath = path.resolve('backup', folderName)
  const backupZip = path.resolve('backup', 'zip')
  const cmd = `"${process.env.MONGODUMP}" --uri="mongodb://localhost:27017/rmutt" --archive=backup/${folderName}/backup` 
  const pendingFolderList = [
    fse.copy(path.resolve('avatar'), path.resolve(backupPath, 'avatar')),
    fse.copy(path.resolve('award'), path.resolve(backupPath, 'award')),
    fse.copy(path.resolve('report'), path.resolve(backupPath, 'report')),
    Aexec(cmd)
  ]
  try {
    if(!fs.existsSync(path.resolve('backup'))) {
      fs.mkdirSync('backup')
    }
    if(!fs.existsSync(backupPath)) {
      fs.rmdirSync(backupPath, { recursive: true })
    }
    if(!fs.existsSync(backupZip)) {
      fs.mkdirSync(backupZip, { recursive: true })
    }
  
    fs.mkdirSync(backupPath, { recursive: true })
    
    await Promise.all(pendingFolderList)
    await zipDir(backupPath, path.resolve(backupZip, folderName+'.zip'))
    res.json({
      status: 200,
      message: ' backup success'
    })
      
      
    } catch (error) {
      console.log(error)
      return res.status(500).send(error)
    }
  }

exports.downloadBackup = (req, res) => {
  const { name } = req.params
  const ff = path.resolve('backup', 'zip', name)
  res.download(ff, 'backup.zip')
}

  exports.getBackup = (req, res) => {
    try {
      const listDir = fs.readdirSync(path.resolve('backup', 'zip'))
      return res.json(listDir)
    } catch (error) {
      return res.status(500).send(error)
    }
  }

  exports.getRestore = (req, res) => {
    const {folder} = req.params
    const cmd = `"${process.env.MONGORESTORE}" mongorestore --archive=backup/${folder}/backup --drop --nsInclude="rmutt.*"`
    const backupPath = path.resolve('backup', folder)
    const pendingFolderList = [
      fse.copy(path.resolve(backupPath, 'avatar'), path.resolve('avatar')),
      fse.copy(path.resolve(backupPath, 'award'), path.resolve('award'),),
      fse.copy(path.resolve(backupPath, 'report'), path.resolve('report'))
    ]
    try {
      fs.rmdirSync(path.resolve('avatar'), { recursive:true })
      fs.rmdirSync(path.resolve('award'), { recursive:true })
      fs.rmdirSync(path.resolve('report'), { recursive:true })
      fs.mkdirSync(path.resolve('avatar'))
      fs.mkdirSync(path.resolve('award'))
      fs.mkdirSync(path.resolve('report'))
      Promise.all(pendingFolderList)
      exec(cmd, (err, stdout, stderr) => {
        if(err) {
          console.log(err)
          return res.status(500).send('error')
        }
        res.json({
          status: 200,
          message: 'restore success'
        })
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send(error)
    }
  }

  function zipDir(source, output) {
    const archive = archiver('zip-encryptable', {
      zlib: { level: 9 },
      forceLocalTime: true,
      password: process.env.ZIP_PASSWORD
    })
    const outStream = fs.createWriteStream(output)
    

    archive
      .directory(source, false)
      .on('error', err => { throw err })
      .pipe(outStream)

    
    outStream.on('close', () => true)
    

    return archive.finalize()
  
    
  }
