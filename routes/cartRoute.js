const { authentication } = require('../controllers/authController');
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  checkoutCart,
} = require('../controllers/cartController');
const router = require('express').Router();
router
  .route('/')
  .post(authentication, getCart, addToCart)
  .put(authentication, getCart, updateCartItemQuantity)
  .delete(authentication, getCart, removeFromCart);

router.route('/clear').delete(authentication, getCart, clearCart);
router.route('/checkout').post(authentication, checkoutCart);
module.exports = router;
