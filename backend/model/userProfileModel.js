const mongoose = require('mongoose')
const userProfileSchema = mongoose.Schema({
  name:{
    type:String
  },
  gender:{
    type:String
  },
  DOB:{
    type:String
  },
  refID:{
    type:String
  }
})

const userProfile = mongoose.model('userProfile', userProfileSchema)
module.exports = userProfile;