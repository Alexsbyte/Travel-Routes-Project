'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   // Удаляем старый внешний ключ (если есть)
   await queryInterface.removeConstraint('Photos', 'Photos_route_id_fkey');

   // Добавляем новый внешний ключ с каскадным удалением
   await queryInterface.addConstraint('Photos', {
     fields: ['route_id'],
     type: 'foreign key',
     name: 'route_id', // Убедись, что имя совпадает с текущим ключом
     references: {
       table: 'Routes',
       field: 'id',
     },
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE',
   });
 },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
