"use strict";
const bcrypt = require('bcrypt');
require('dotenv').config();
console.log(`${process.env.ADMIN_PASSWORD}`);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPasswordAdmin = await bcrypt.hash(`${process.env.ADMIN_PASSWORD}`, 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin",
          email: "admin@exam.com",
          password: hashedPasswordAdmin,
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
