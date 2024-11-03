const sequelize = require('../../config/database');
const { Sequelize } = require('sequelize');
const orderItem = require('./orderitem');

const order = sequelize.define(
  'order',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    created: {
      type: Sequelize.DATE,
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    totalAmount: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
        notEmpty: true,
      },
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['pending', 'shipped', 'delivered', 'cancelled']],
        notEmpty: true,
      },
    },
    paymentStatus: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['paid', 'unpaid', 'refunded']],
        notEmpty: true,
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
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'order',
  }
);

order.hasMany(orderItem, {
  foreignKey: 'orderId',
  as: 'orderItems',
  onDelete: 'CASCADE',
});
orderItem.belongsTo(order, { foreignKey: 'orderId', as: 'order' });

module.exports = order;
