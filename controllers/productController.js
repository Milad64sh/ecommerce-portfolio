const product = require('../db/models/product');
const user = require('../db/models/user');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const createProduct = catchAsync(async (req, res, next) => {
  const body = req.body;
  const userId = req.user.id;
  const newProduct = await product.create({
    title: body.title,
    productImage: body.productImage,
    price: body.price,
    shortDescription: body.shortDescription,
    description: body.description,
    productUrl: body.productUrl,
    category: body.category,
    tags: body.tags,
    createdBy: userId,
  });
  return res.status(201).json({
    status: 'success',
    data: newProduct,
  });
});

const getAllProducts = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const result = await product.findAll({
    include: user,
    where: { createdBy: userId },
  });

  return res.json({
    status: 'success',
    data: result,
  });
});
const getProductById = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const result = await product.findByPk(productId, { include: user });
  if (!result) {
    return next(new AppError('Invalid product id', 400));
  }
  return res.json({
    status: 'success',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const body = req.body;
  const result = await product.findOne({
    where: { id: productId, createdBy: userId },
  });

  if (!result) {
    return next(new AppError('Invalid porduct id', 400));
  }

  result.title = body.title;
  result.productImage = body.productImage;
  result.price = body.price;
  result.shortDescription = body.shortDescription;
  result.description = body.description;
  result.productUrl = body.productUrl;
  result.category = body.category;
  result.tags = body.tags;

  const updatedResult = await result.save();

  return res.json({
    status: 'success',
    data: updatedResult,
  });
});
const deleteProduct = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const result = await product.findOne({
    where: { id: productId, createdBy: userId },
  });

  if (!result) {
    return next(new AppError('Invalid porduct id', 400));
  }

  await result.destroy();

  return res.json({
    status: 'success',
    message: 'Deleted successfully',
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
