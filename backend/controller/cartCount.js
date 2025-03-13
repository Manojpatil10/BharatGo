const cartModel = require('../model/cartModel')

exports.cartCount=(req,res,next)=>{
  const userID  = req.userID;

  if (!userID) {
    return res.status(400).json({ error: "User ID is required" });
  }

  cartModel.countDocuments({ userID: userID }) // MongoDB count query
    .then((count) => {
      // console.log(count)
      res.json({ count });
    })
    .catch((error) => {
      // console.error("Error fetching cart count:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}