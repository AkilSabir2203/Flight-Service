import { Sequelize } from "sequelize";
import CrudRepository from "./crud-repository.js";
import db from "../models/index.js";
import { addRowLockOnFlights } from "./queries.js";

const { Flight, Airplane, Airport, City } = db;

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    return await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          required: true,
          as: "airplaneDetail",
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
        {
          model: Airport,
          required: true,
          as: "arrivalAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });
  }

  async updateRemainingSeats(flightId, seats, dec = true) {
    const transaction = await db.sequelize.transaction();

    try {
      await db.sequelize.query(addRowLockOnFlights(flightId));

      const flight = await Flight.findByPk(flightId);

      if (dec) {
        await flight.decrement("totalSeats", { by: seats, transaction });
      } else {
        await flight.increment("totalSeats", { by: seats, transaction });
      }

      await transaction.commit();
      return flight;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

export default FlightRepository;
