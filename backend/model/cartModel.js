const mongoose = require('mongoose')
const schema = mongoose.Schema({
  productId:{
    type:Number,
    required: true
  },
  productName:{
    type:String,
    required: true
  },
  productPrice:{
    type:Number,
    required: true
  },
  productImage:{
    type:String,
    required: true
  },
  userID:{
    type:String,
    required:true
  }
})

const cartData = mongoose.model('cartdata', schema)
module.exports = cartData