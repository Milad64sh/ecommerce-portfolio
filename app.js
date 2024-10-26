require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require('express');
const app = express();
const authRouter = require('./routes/authRoute');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const { stack } = require('sequelize/lib/utils');
const globalErrorHandler = require('./controllers/errorController');
const port = process.env.APP_PORT || 4000;

app.use(express.json());

app.use('/api/v1/auth', authRouter);

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
