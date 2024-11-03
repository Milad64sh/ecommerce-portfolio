const sequelize = require('../../config/database');
const { Sequelize } = require('sequelize');

const orderItem = sequelize.define(
  'orderItem',
  {
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
        isInt: true,
        notNull: { msg: 'Quantity is required' },
      },
    },
    created: {
      type: Sequelize.DATE,
    },
    modified: {
      type: Sequelize.DATE,
    },
    qty: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
        notNull: { msg: 'Quantity (qty) is required' },
      },
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
        notNull: { msg: 'Price is required' },
      },
    },
    total: {
      type: Sequelize.DECIMAL,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'order',
        key: 'id',
      },
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    status: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'orderItem',
  }
);

module.exports = orderItem;
