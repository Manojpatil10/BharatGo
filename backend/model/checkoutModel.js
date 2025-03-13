const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  items: [
    {
      productID: {
        type: Number,
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      productImage: {
        type: String,
        required: true
      },
      productPrice: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "Pending"
  },
});

module.exports = mongoose.model("orderData", checkoutSchema);
