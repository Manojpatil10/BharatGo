const checkout = require('../model/checkoutModel');
const cartModel = require('../model/cartModel');

exports.checkout = (req, res, next) => {
  const { items, totalPrice } = req.body;
  const userID = req.userID; 

  if (!userID) {
    return res.status(401).json({ message: "Unauthorized: No user ID provided" });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const newOrder = new checkout({
    userID,
    items,
    totalPrice,
  });

  newOrder
    .save()
    .then((order) => {
      return cartModel.deleteMany({ userID });
    })
    .then(() => {
      res.status(201).json({ message: "Order placed successfully, cart cleared" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error processing order", details: error });
    });
};


exports.myOrders = (req, res, next) => {
  const userID = req.userID; 

  if (!userID) {
    return res.status(400).json({ message: "User ID is required" });
  }


  checkout.find({ userID })
    .then((orders) => {
      if (!orders.length) {
        return res.status(404).json({ message: "No orders found" });
      }
      res.status(200).json(orders);
    })
    .catch((error) => {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};