const mongoose = require('mongoose')

const awardSchema = new mongoose.Schema({
  user_id :{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  awardType :Number,
  name :String,
  nameEN :String,
  researchCategory :String,
  fiscalYear :Number,
  jobTitles:String,
  funding:Boolean,
  fundingSource:String,
  eventYear:Number,
  file:[String],
  infoemation:String,
  cover:String,
  highlights :{
    type: Boolean,
    default: false
  },
  markedAward :{
    type: Boolean,
    default: false
  }
})
const Award = mongoose.model('Award', awardSchema)

module.exports = Award