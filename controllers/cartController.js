const cart = require('../db/models/cart');
const cartItem = require('../db/models/cartitem');
const order = require('../db/models/order');
const product = require('../db/models/product');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getCart = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  let result = await cart.findOne({
    where: { userId },
    include: [{ model: cartItem, as: 'cartItems' }],
  });
  if (!result) {
    result = await cart.create({
      userId: userId,
      totalAmount: 0,
      status: 'active',
      createdAt: new Date(),
    });
  }
  req.cart = result;
  next();
});

const addToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;

  const userCart = req.cart;
  const productExists = await product.findByPk(productId);
  if (!productExists) {
    return next(new AppError('product not found', 404));
  }

  const existingCartItem = await cartItem.findOne({
    where: { cartId: userCart.id, productId },
  });
  if (existingCartItem) {
    existingCartItem.quantity += quantity;
    await existingCartItem.save();
  } else {
    await cartItem.create({
      cartId: userCart.id,
      productId,
      quantity,
    });
  }
  const updatedCart = await cart.findOne({
    where: { id: userCart.id },
    include: [{ model: cartItem, as: 'cartItems' }],
  });
  res.status(200).json({
    status: 'success',
    data: updatedCart,
  });
});

const removeFromCart = catchAsync(async (req, res, next) => {
  const { productId } = req.body;
  const currentCart = req.cart;

  const existingCartItem = await cartItem.findOne({
    where: { cartId: currentCart.id, productId },
  });
  if (!existingCartItem) {
    return next(new AppError('Product not found in cart', 404));
  }
  await existingCartItem.destroy();
  res.status(200).json({
    status: 'success',
    message: 'Item removed from cart',
  });
});

const updateCartItemQuantity = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const cart = req.cart;

  const existingCartItem = await cartItem.findOne({
    where: { cartId: cart.id, productId },
  });
  if (!existingCartItem) {
    return next(new AppError('Product not found in cart', 404));
  }
  existingCartItem.quantity = quantity;
  await existingCartItem.save();
  res.status(202).json({
    status: 'success',
    message: 'Item quantity updated',
  });
});

const clearCart = catchAsync(async (req, res, next) => {
  const currentCart = req.cart;

  await cartItem.destroy({ where: { cartId: currentCart.id } });

  res.status(200).json({
    status: 'success',
    message: 'Cart cleared successfully',
  });
});

const checkoutCart = catchAsync(async (req, res, next) => {
  const cart = req.cart;

  const totalAmount = cart.cartItems.reduce((acc, item) => acc + item);
  const newOrder = await order.create({
    userId: req.user.id,
    totalAmount,
    status: 'pending',
    paymentStatus: 'unpaid',
  });
  await Promise.all(
    cart.cartItems.map(async (item) => {
      await orderItem.create({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    })
  );

  await cartItem.destroy({ where: { cartId: cart.id } });

  res.status(200).json({
    status: 'success',
    message: 'Checkout successful',
    data: newOrder,
  });
});

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  checkoutCart,
};
