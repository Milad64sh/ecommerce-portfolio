require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require('express');
const app = express();
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const orderRouter = require('./routes/orderRoute');
const cartRouter = require('./routes/cartRoute');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');

const globalErrorHandler = require('./controllers/errorController');
const port = process.env.APP_PORT || 4000;

app.use(express.json());

// all routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/carts', cartRouter);

app.use(
  '*',
  catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
