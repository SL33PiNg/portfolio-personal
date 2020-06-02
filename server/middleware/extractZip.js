const fs = require('fs')
const path = require('path')
const unzipper = require('unzipper')

 module.exports = async(req, res, next) => {
   try {
    const directory = await unzipper.Open.file(req.file.path)
    if(fs.existsSync('zipTemp')){
      fs.rmdirSync('zipTemp')
      fs.mkdirSync('zipTemp')
    }else{
      fs.mkdirSync('zipTemp')
    }
    directory.files
      .filter((f) => f.type === 'Directory')
      .forEach((a) => fs.mkdirSync(path.resolve('zipTemp', a.path), { recursive: true }))
      // TODO: restore บ่ได๋
    const res = directory.files
      .filter((f) => f.type === 'File')
      .map(
        // eslint-disable-next-line require-await
        async (f) => f.stream(process.env.ZIP_PASSWORD).pipe(fs.createWriteStream(path.resolve('zipTemp',f.path))).on('finish', () => 1).on('error', (err) => err)
        )
      await Promise.all(res)
    next()
    } catch (error) {
    return res.status(500).send(error)
   }
 }
