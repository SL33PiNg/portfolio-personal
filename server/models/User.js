const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false
  },
  avatar: {
    type: String,
    default: 'default.jpg'
  },
  roles: {
    type: [ String ],
    enum: [ 'USER', 'ADMIN' ],
    default: [ 'USER' ]
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expId: [ String ],
  skillsDetails: String,
  ocscId: [ String ],
  personalInfo: {
    academicRank: {
      type: String,
      default: ''
    },
    nicknameEN: {
      type: String,
      default: ''
    },
    firstnameEN: {
      type: String,
      default: ''
    },
    lastnameEN: {
      type: String,
      default: ''
    },
    nicknameTH: {
      type: String,
      default: ''
    },
    firstnameTH: {
      type: String,
      default: ''
    },
    lastnameTH: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    facebook: {
      type: String,
      default: ''
    },
    lineID: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    showPhone: {
      type: Boolean,
      default: false
    },

    DOB: Date
  },
  careerInfo: {
    email: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    jobPost: {
      type: String,
      default: ''
    },
    department: {
      type: String,
      default: ''
    },
    dpmentID: {
      type: Number,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: ''
    }
  },
  workinfo: [
    {
      start: Number,
      end: Number,
      status: Boolean,
      country: String,
      department: String,
      company: String,
      position: String,
      workinfoDetails: String
    }
  ],
  educationinfo: [
    {
      educationVocabulary: String,
      educationName: String,
      academyName: String,
      branch: String,
      graduate: Number,
      country: String,
      status: Boolean,
      image: String,
      educationinfoDetails: String
    }
  ],
  certificateinfo: [
    {
      certificateName: String,
      graduate: Number,
      guarantee: String,
      file: String,
      certificateinfoDetails: String
    }
  ],
  awardList: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Award'
    }
  ]
})

const User = mongoose.model('User', userSchema)

module.exports = User
