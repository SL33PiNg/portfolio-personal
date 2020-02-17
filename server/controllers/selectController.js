const counterModel = require('../models/Counter')
const departmentModel = require('../models/DepartList')
const expertistModel = require('../models/Expertist')
const positionOcscModel = require('../models/PositionOcsc')

exports.setCounter = async (req, res) => {
  await counterModel.create({
    name: 'department',
    next: 0
  })
  res.send('ok')
}

exports.getAlldepartment = async (req, res) => {
  try {
    const result = await departmentModel.find()
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.addDepartment = async (req, res) => {
  const { name } = req.body
  try {
    const result = await departmentModel.create({
      _id: await getCounter('department'),
      name
    })
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.editDepartment = async (req, res) => {
  const { _id, name } = req.body
  try {
    const result = await departmentModel.findByIdAndUpdate(
      _id,
      { name },
      { new: true }
    )
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.delDepartment = async (req, res) => {
  const { _id } = req.params
  try {
    const result = await departmentModel.findByIdAndRemove(_id)
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.getAllExpertist = async (req, res) => {
  try {
    const result = await expertistModel.find()
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.addExpertist = async (req, res) => {
  const { name } = req.body
  try {
    const result = await expertistModel.create({
      _id: await getCounter('expertist'),
      name
    })
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.editExpertist = async (req, res) => {
  const { _id, name } = req.body
  try {
    const result = await expertistModel.findByIdAndUpdate(
      _id,
      { name },
      { new: true }
    )
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.delExpertist = async (req, res) => {
  const { _id } = req.params
  try {
    const result = await expertistModel.findByIdAndRemove(_id)
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.addSubExpertist = async (req, res) => {
  const { _id, subName } = req.body
  try {
    const result = await expertistModel.findByIdAndUpdate(
      _id,
      { $push: { sub: { name: subName } } },
      { new: true }
    )
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.updateSubExpertist = async (req, res) => {
  const { _id, subId, subName } = req.body
  try {
    const result = await expertistModel.updateOne(
      { _id, sub: { $elemMatch: { _id: subId } } },
      { $set: { 'sub.$.name': subName } }
    )
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.deleteSubExpertist = async (req, res) => {
  const { _id, subId } = req.params
  console.log(_id, subId)
  try {
    const result = await expertistModel.findByIdAndUpdate(
      _id,
      { $pull: { sub: { _id: subId } } },
      { new: true }
    )
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

// ******positionOcsc******
exports.getAllPositionOcsc = async (req, res) => {
  try {
    const result = await positionOcscModel.find()
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.addPositionOcsc = async (req, res) => {
  const { name } = req.body
  try {
    const result = await positionOcscModel.create({
      _id: await getCounter('positionOcsc'),
      name
    })
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.editPositionOcsc = async (req, res) => {
  const { _id, name } = req.body
  try {
    const result = await positionOcscModel.findByIdAndUpdate(
      _id,
      { name },
      { new: true }
    )
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.delPositionOcsc = async (req, res) => {
  const { _id } = req.params
  try {
    const result = await positionOcscModel.findByIdAndRemove(_id)
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.addSubPositionOcsc = async (req, res) => {
  const { _id, subName } = req.body
  try {
    const result = await positionOcscModel.findByIdAndUpdate(
      _id,
      { $push: { sub: { name: subName } } },
      { new: true }
    )
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.updateSubPositionOcsc = async (req, res) => {
  const { _id, subId, subName } = req.body
  try {
    const result = await positionOcscModel.updateOne(
      { _id, sub: { $elemMatch: { _id: subId } } },
      { $set: { 'sub.$.name': subName } }
    )
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

exports.deleteSubPositionOcsc = async (req, res) => {
  const { _id, subId } = req.params
  console.log(_id, subId)
  try {
    const result = await positionOcscModel.findByIdAndUpdate(
      _id,
      { $pull: { sub: { _id: subId } } },
      { new: true }
    )
    res.json(result)
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message })
  }
}

async function getCounter(name) {
  const result = await counterModel.findOneAndUpdate(
    { name },
    { $inc: { next: 1 } },
    { new: true, upsert: true }
  )
  return result.next
}
