const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department
