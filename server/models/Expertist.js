const mongoose = require('mongoose')

const expertistSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  sub: [
    {
      name: {
        type: String,
        required: true
      }
    }
  ]
})

const Expertist = mongoose.model('Expertist', expertistSchema)

module.exports = Expertist
