const UserModel = require('../models/User')
const ReportModel = require('../models/report')

exports.getAllUserProfile = async (req, res) => {
  try {
    const users = await UserModel.find({ username: { $ne: 'admin' }, isPublic: true, isActive: true }, { password: 0 })
    return res.send(users)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.getProfileByUsername = async (req, res) => {
  const { username } = req.params
  if (username === 'admin') {
    return res.status(403).json({ status: 403, message: 'no permission' })
  }
  try {
    const profile = await UserModel.findOne({ username }).populate({ path: 'awardList', options: { sort: { 'highlights': -1, 'eventYear': -1 } } })
    return res.send(profile)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.addReport = async (req, res) => {
  const { profileID, profileName, information, reportName, profilefirstnameTH, profilelastnameTH } = req.body
  try {
    const result = await ReportModel.create({
      profileID,
      profileName,
      reportName,
      information,
      profilefirstnameTH,
      profilelastnameTH
    })
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.search = async (req, res) => {
  const { academic, name, expId, ocscId } = req.body
  try {
    let result
    if(name){
      result = await UserModel.find({ 
        username: { $ne: 'admin' },
        $or: [
          {"personalInfo.academicRank": academic},
          { "personalInfo.firstnameTH": {$regex: name} },
          { "personalInfo.lastnameTH": {$regex: name} },
          { "personalInfo.nicknameTH": {$regex: name} },
          { expId },
          { ocscId },
        ]
      })
    } else {
        result = await UserModel.find({ 
          username: { $ne: 'admin' },
          $or: [
            {"personalInfo.academicRank": academic},
            { expId },
            { ocscId },
          ]
        })

    }
    return res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.advancedSearch = async (req, res) => {
  const { query } = req.body
  try {
    const result = await UserModel.find( query )
    return res.json(result)
  } catch (error) {
    console.log(error)
    console.log(error)
    return res.status(500).json({ status: 500, message: error.message })
  }
}
