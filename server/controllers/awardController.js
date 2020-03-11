const UserModel = require('../models/User')
const AwardModel = require('../models/award')

exports.addAward = async (req, res) => {
  const { id } = req.user
  try {
    const award = await AwardModel.create({ user_id : id })
    res.json(award)
    const result = await UserModel.findByIdAndUpdate( id, {$push: { awardList: award._id }}, { new: true })
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}
