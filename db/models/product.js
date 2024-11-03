const sequelize = require('../../config/database');
const { Sequelize } = require('sequelize');

module.exports = sequelize.define(
  'product',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'title cannot be null',
        },
        notEmpty: {
          msg: 'title cannot be empty',
        },
      },
    },
    isFeatured: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: 'isFeatured value must be true or false',
        },
      },
    },
    productImage: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'productImage cannot be null',
        },
      },
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'price cannot be null',
        },
        isDecimal: {
          msg: 'price value must be in decimal',
        },
      },
    },
    shortDescription: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'shortDescription cannot be null',
        },
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'title cannot be null',
        },
        notEmpty: {
          msg: 'title cannot be empty',
        },
      },
    },
    productUrl: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'productUrl cannot be null',
        },
        notEmpty: {
          msg: 'productUrl cannot be empty',
        },
        isUrl: {
          msg: 'Invalid productUrl string',
        },
      },
    },
    category: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    tags: { type: Sequelize.ARRAY(Sequelize.STRING) },
    createdBy: {
      type: Sequelize.INTEGER,
      references: {
        model: 'user',
        key: 'id',
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
    modelName: 'product',
  }
);
