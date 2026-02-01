import { Op } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Airplanes", [
        {
            modelNumber: "airbus340",
            capacity: 900,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            modelNumber: "boeing777",
            capacity: 450,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Airplanes", {
        [Op.or]: [
            { modelNumber: "boeing777" },
            { modelNumber: "airbus340" },
        ],
    });
}
