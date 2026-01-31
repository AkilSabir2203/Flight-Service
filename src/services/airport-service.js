import { StatusCodes } from "http-status-codes";
import { AirportRepository } from "../repositories/index.js";
import AppError from "../utils/errors/app-error.js";

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const explanation = error.errors.map(err => err.message);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot create a new Airport object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirports() {
  try {
    return await airportRepository.getAll();
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(id) {
  try {
    return await airportRepository.get(id);
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airport you requested is not present",
        StatusCodes.NOT_FOUND
      );
    }

    throw new AppError(
      "Cannot fetch data of the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirport(id) {
  try {
    return await airportRepository.destroy(id);
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airport you requested to delete is not present",
        StatusCodes.NOT_FOUND
      );
    }

    throw new AppError(
      "Cannot destroy the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
};
