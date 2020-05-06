const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
  reportName: String,
  profileID: String,
  profileName: String,
  information: String,
  profilefirstnameTH: String,
  profilelastnameTH: String,
  cover: String,
  date: {
    type: Date, 
    default: Date.now},
  status: {
    type: Boolean,
    default: false
  }
})
const Report = mongoose.model('Report', reportSchema)

module.exports = Report
