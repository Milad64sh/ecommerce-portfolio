const { authentication, restrictTo } = require('../controllers/authController');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = require('express').Router();

router
  .route('/')
  .post(authentication, restrictTo('1'), createProduct)
  .get(authentication, restrictTo('1'), getAllProducts);

router
  .route('/:id')
  .get(authentication, restrictTo('1'), getProductById)
  .put(authentication, restrictTo('1'), updateProduct)
  .delete(authentication, restrictTo('1'), deleteProduct);

module.exports = router;
