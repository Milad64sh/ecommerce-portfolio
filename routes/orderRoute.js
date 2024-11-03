const { authentication, restrictTo } = require('../controllers/authController');
const {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
} = require('../controllers/orderController');

const router = require('express').Router();

router
  .route('/')
  .post(authentication, restrictTo('2'), createOrder)
  .get(authentication, restrictTo('2'), getAllOrders);

router
  .route('/:id')
  .get(authentication, restrictTo('2'), getOrderById)
  .delete(authentication, restrictTo('2'), deleteOrder);

module.exports = router;
