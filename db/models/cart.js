'use strict';
const { Sequelize } = require('sequelize');
const sequelize = require('../../config/database');
const cartItem = require('./cartitem');
const cart = sequelize.define(
  'cart',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'user',
        key: 'id',
      },
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'active',
      validate: {
        isIn: {
          args: [['active', 'pending', 'checked-out', 'abandoned']],
        },
      },
    },
    totalAmount: {
      type: Sequelize.DECIMAL,
      allowNull: true,
      validate: {
        min: {
          args: [0],
          msg: 'Total amount cannot be negative',
        },
      },
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'cart',
  }
);

cart.hasMany(cartItem, {
  foreignKey: 'cartId',
  as: 'cartItems',
  onDelete: 'CASCADE',
});
cartItem.belongsTo(cart, { foreignKey: 'cartId', as: 'cart' });

module.exports = cart;
