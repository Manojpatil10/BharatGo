const cartModel = require("../model/cartModel");

exports.saveCartData = (req, res, next) => {
  const { id, title, price, categoryImage } = req.body;
  const userID = req.userID;

  cartModel.findOne({ userID: userID, productId: id })
    .then((existingCartItem) => {
      if (existingCartItem) {
        return res.status(400).json({ message: "Product is already in the cart" });
      }

      // If not in the cart, add the product
      const newCartItem = new cartModel({
        userID: userID,
        productId: parseInt(id),
        productName: title,
        productPrice: parseInt(price),
        productImage: categoryImage,
      });

      return newCartItem.save().then(() => {
        res.status(200).json({ message: "Product added to cart successfully" });
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error, please try again" });
    });
};



exports.sendCartdata=(req,res,next)=>{
  const userID = req.userID;

  cartModel.find({ userID: userID })
    .then((cartItems) => {
      if (cartItems.length === 0) {
        return res.status(404).json({ message: "No cart items found" });
      }
      res.status(200).json(cartItems);
    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
      res.status(500).json({ message: "Internal server error" });
    });
}


exports.removeCartItem=(req,res,next)=>{
  const {productID} = req.body
  const userID = req.userID;

  // console.log(productID)
  // console.log(userID)


  cartModel.findOneAndDelete({ productId : productID, userID })
    .then((deletedItem) => { 
      if (!deletedItem) {
        return res.status(404).json({ message: "Item not found in the cart" });
      }
      res.status(200).json({ message: "Item removed successfully", deletedItem });
    })
    .catch((error) => {
      console.error("Error removing item:", error);
      res.status(500).json({ message: "Failed to remove item", error });
    });
}