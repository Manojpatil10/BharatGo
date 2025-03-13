const express = require('express')
const router = express.Router()

const userAuth = require('../middleware/userAuth').userAuthenticate;
const userLogin = require('../controller/userLogin').userLogin;
const userSignup = require('../controller/userSignup').userSignup;
const saveCartData = require('../controller/cartData').saveCartData;
const cartCount = require('../controller/cartCount').cartCount;
const sendCartData = require('../controller/cartData').sendCartdata;
const removeCartItem = require('../controller/cartData').removeCartItem;
const checkout = require('../controller/checkout').checkout;
const myOrders = require('../controller/checkout').myOrders;
const accountData = require('../controller/account').accountData;
const sendAccoundData = require('../controller/account').sendAccoundData;

router.post('/api/login', userLogin);
router.post('/api/signup', userSignup);
router.post('/api/cart', userAuth, saveCartData);
router.post('/api/cartCount', userAuth, cartCount);   
router.get('/api/cart', userAuth, sendCartData);
router.delete('/api/cart', userAuth, removeCartItem);
router.post('/api/checkout', userAuth, checkout);
router.post('/api/orders', userAuth, myOrders);
router.post('/api/account', userAuth, accountData);
router.get('/api/account', userAuth, sendAccoundData)

module.exports = router