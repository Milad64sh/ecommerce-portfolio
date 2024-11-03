'use strict';
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');
const AppError = require('../../utils/appError');
const product = require('./product');
const order = require('./order');
const cart = require('./cart');

const user = sequelize.define(
  'user',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userType: {
      type: Sequelize.ENUM('0', '1', '2'),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'userType cannot be null',
        },
        notEmpty: {
          msg: 'userType cannot be empty',
        },
      },
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'firstName cannot be null',
        },
        notEmpty: {
          msg: 'firstName cannot be empty',
        },
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'lastName cannot be null',
        },
        notEmpty: {
          msg: 'lastName cannot be empty',
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email cannot be null',
        },
        notEmpty: {
          msg: 'email cannot be empty',
        },
        isEmail: {
          msg: 'Invalid email id',
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password cannot be null',
        },
        notEmpty: {
          msg: 'password cannot be empty',
        },
      },
    },
    confirmPassword: {
      type: Sequelize.VIRTUAL,
      set(value) {
        if (this.password.length < 7) {
          throw new AppError('Password length must be greater than 7', 400);
        }
        if (value === this.password) {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hashPassword);
        } else {
          throw new AppError(
            'Password and confirm password must be the same',
            400
          );
        }
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'user',
  }
);

user.hasOne(cart, { foreignKey: 'userId', as: 'cart' });
cart.belongsTo(user, { foreignKey: 'userId', as: 'user' });

user.hasMany(product, { foreignKey: 'createdBy' });
product.belongsTo(user, {
  foreignKey: 'createdBy',
});

user.hasMany(order, { foreignKey: 'userId', onDelete: 'CASCADE' });
order.belongsTo(user, {
  foreignKey: 'userId',
});

module.exports = user;
