/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Flights", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    flightNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    airplaneId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Airplanes",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    departureAirportId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "Airports",
        key: "code",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    arrivalAirportId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "Airports",
        key: "code",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    arrivalTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    departureTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    boardingGate: {
      type: Sequelize.STRING,
    },
    totalSeats: {
      type: Sequelize.INTEGER,
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
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Flights");
}
