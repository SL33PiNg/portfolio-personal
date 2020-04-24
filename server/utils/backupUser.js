/* eslint-disable prettier/prettier */
const fs = require('fs')
const path = require('path')
const UserModel = require('../models/User')
// const AwardModel = require('../models/award')
const mongoose = require('mongoose')
// const archiver = require('archiver')
// const noobId = "5e553bb921e5752c6000040b"
mongoose.connect('mongodb://localhost:27017/rmutt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
async function userExport(noobId) {
  if(!fs.existsSync(path.resolve('temp'))) {
    fs.mkdirSync(path.resolve('temp'))
  }
  const tempPath = path.resolve('temp', noobId)
  if(fs.existsSync(tempPath)){
    fs.rmdirSync(tempPath, { recursive: true })
    fs.mkdirSync(tempPath)
  }
  try {
    const user = await UserModel.findById(noobId)
    user.awardList = []
    fs.writeFileSync(path.resolve(tempPath, 'user.json'), JSON.stringify(user))

    return path.resolve(tempPath, 'user.json')

  } catch (error) {
    
  }
}

// async function exportUser(noobId) {
//   if(!fs.existsSync(path.resolve('temp'))) {
//     fs.mkdirSync(path.resolve('temp'))
//   }
//   const tempPath = path.resolve('temp', noobId)
//   fs.mkdirSync(tempPath)
//   try {

//     const user = await UserModel.findById(noobId)
//     user.awardList = []
//     user._id = ''
//     fs.copyFileSync(path.resolve('avatar', user.avatar), path.resolve(tempPath, user.avatar))
//     fs.writeFileSync(path.resolve(tempPath, 'user.json'), JSON.stringify(user))

//     const awards = await AwardModel.find({ user_id: noobId })
//     awards.forEach(award => {
//       award.markedAward = false
//       award.user_id = ''
//       fs.copyFileSync(path.resolve('award', award.cover), path.resolve(tempPath, award.cover))
//     })
//     fs.writeFileSync(path.resolve(tempPath, 'award.json'), JSON.stringify(awards))

//     const zipPath = await zipFile(noobId)
   
//     fs.rmdirSync(tempPath, { recursive: true })
//     return zipPath
//   } catch (error) {
//     console.log(error)
//   }
// }

// async function zipFile(noobId) {
//   if(!fs.existsSync('zip')) {
//     fs.mkdirSync('zip')
//   }
//   const zipFilePath = path.resolve('zip', noobId + '.zip')
//   if(fs.existsSync(zipFilePath)) {
//     fs.unlinkSync(zipFilePath)
//   }
//   const output = fs.createWriteStream( zipFilePath )
//   const archive = archiver('zip', {
//     zlib: { level: 9 }
//   })

  
//   archive.pipe(output)
  
//   archive.directory(path.resolve('temp', noobId), false)
//   try {
    
//     await archive.finalize()
   
//   } catch (error) {
//     console.log(error)
//   }
//   return new Promise((resolve, reject) => {
//     output.on('close', resolve(zipFilePath))
//     output.on('error', reject(new Error('error')))
//   })
// }

module.exports = userExport


