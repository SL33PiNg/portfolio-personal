const mongoose = require('mongoose')

const showAwardSchema = new mongoose.Schema({
  award_id: [{
    type:mongoose.Types.ObjectId,
    ref : 'award'
  }]
})

const showAwar = mongoose.model('Award', showAwardSchema)

module.exports = showAwar