const JWT = require("jsonwebtoken");
exports.userAuthenticate = (req, res, next) => {
  const mytoken = req.body.ID || req.query.ID;

  // console.log(mytoken)
  const secret = process.env.SECRET_KEY;
  const user = JWT.verify(mytoken, secret);

  req.userID = user.id; 
  next();
};
