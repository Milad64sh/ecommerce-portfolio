'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'orderItem',
      [
        {
          orderId: 10,
          productId: 1,
          qty: 2,
          price: 20.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orderItem', null, {});
  },
};
