'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order', {
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
        references: { model: 'user', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      totalAmount: {
        type: Sequelize.DECIMAL,
      },
      status: {
        type: Sequelize.STRING,
      },
      paymentStatus: {
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
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order');
  },
};
