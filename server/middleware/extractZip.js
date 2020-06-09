const fs = require('fs')
const path = require('path')

const sevenBin =require('7zip-bin')
const { extractFull } = require('node-7z')

 module.exports = (req, res, next) => {
  const pathTo7zip = sevenBin.path7za
   try {
    if(fs.existsSync('zipTemp')){
      fs.rmdirSync('zipTemp', {recursive: true})
      fs.mkdirSync('zipTemp')
    }else{
      fs.mkdirSync('zipTemp')
    }
    const zipStream = extractFull(req.file.path, path.resolve('zipTemp'), {
      $bin: pathTo7zip,
      password:process.env.ZIP_PASSWORD,
      $progress: true
    })
    zipStream.on('data', () => {})
    zipStream.on('progress', (progress) => { res.write(progress.percent+'\n')})
    zipStream.on('end', () => { next() })
    zipStream.on('error', (err) => res.status(500).send(err))
    
   
    } catch (error) {
    return res.status(500).send(error)
   }
 }
