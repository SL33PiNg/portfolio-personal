const mongoose = require('mongoose')

const positionOcscSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  sub: [
    {
      name: {
        type: String,
        unique: true,
        required: true
      }
    }
  ]
})

const positionOcsc = mongoose.model('positionOcsc', positionOcscSchema)

module.exports = positionOcsc
