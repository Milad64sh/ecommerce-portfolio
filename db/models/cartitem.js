'use strict';
const { Sequelize } = require('sequelize');
const sequelize = require('../../config/database');
const cartItem = sequelize.define('cartItems', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  price: {
    type: Sequelize.DECIMAL,
  },
  cartId: {
    type: Sequelize.INTEGER,
    references: { model: 'cart', key: 'id' },
    allowNull: false,
    onDelete: 'CASCADE',
  },
  productId: {
    type: Sequelize.INTEGER,
    references: { model: 'product', key: 'id' },
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});

module.exports = cartItem;
