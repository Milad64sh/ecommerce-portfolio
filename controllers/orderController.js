const catchAsync = require('../utils/catchAsync');
const user = require('../db/models/user');
const order = require('../db/models/order');
const AppError = require('../utils/appError');
const orderItem = require('../db/models/orderitem');

const createOrder = catchAsync(async (req, res, next) => {
  const body = req.body;
  const userId = req.user.id;
  const newOrder = await order.create(
    {
      items: body.items,
      created: body.created,
      totalAmount: body.totalAmount,
      status: body.status,
      paymentStatus: body.paymentStatus,
      userId: userId,
      orderItems: body.items,
    },
    {
      include: [
        {
          model: orderItem,
          as: 'orderItems',
        },
      ],
    }
  );
  return res.status(201).json({
    status: 'success',
    data: newOrder,
  });
});

const getAllOrders = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const result = await order.findAll({
    include: [
      { model: user, as: 'user' },
      { model: orderItem, as: 'orderItems' },
    ],
    where: { userId: userId },
  });
  return res.json({
    status: 'success',
    data: result,
  });
});

const getOrderById = catchAsync(async (req, res, next) => {
  const orderId = req.params.id;
  const result = await order.findByPk(orderId, {
    include: [
      { model: user, as: 'user' },
      { model: orderItem, as: 'orderItems' },
    ],
  });
  if (!result) return next(new AppError('Invalid order id', 400));

  return res.json({
    status: 'success',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const orderId = req.params.id;
  const userId = req.user.id;
  const result = await order.findOne({
    where: { id: orderId, userId: userId },
    include: { model: orderItem, as: 'orderItems' },
  });
  if (!result) return next(new AppError('Order not found', 404));
  await orderItem.destroy({ where: { orderId: orderId } });
  await result.destroy();
  return res.json({ status: 'success', message: 'Order deleted successfully' });
});

module.exports = { createOrder, getAllOrders, getOrderById, deleteOrder };
