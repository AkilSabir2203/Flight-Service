/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Airplanes", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    modelNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          isAlphanumeric: true,
      },
    },
    capacity: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      validate: {
          max: 1000,
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
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Airplanes");
}
