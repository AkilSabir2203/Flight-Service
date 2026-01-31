import { StatusCodes } from "http-status-codes";
import { FlightRepository } from "../repositories/index.js";
import AppError from "../utils/errors/app-error.js";
import { Op } from "sequelize";

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    return await flightRepository.create(data);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const explanation = error.errors.map(err => err.message);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot create a new Flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

// /api/v1/flights?trips=MUM-DEL&travellers=2&price=3000-4000&sort=price_DESC,departureTime_ASC

async function getAllFlights(query) {
  const customFilter = {};
  let sortFilter = [];
  const endingTripTime = " 23:59:00";

  // trips=MUM-DEL
  if (query.trips) {
    const [departureAirportId, arrivalAirportId] = query.trips.split("-");

    if (departureAirportId === arrivalAirportId) {
      throw new AppError(
        "Departure Airport and Arrival Airport can't be same",
        StatusCodes.BAD_REQUEST
      );
    }

    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }

  // price=3000-4000
  if (query.price) {
    const [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [
        Number(minPrice),
        maxPrice ? Number(maxPrice) : 20000,
      ],
    };
  }

  // travellers=2
  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: Number(query.travellers),
    };
  }

  // tripDate=2025-01-31
  if (query.tripDate) {
    customFilter.departureTime = {
      [Op.between]: [query.tripDate, query.tripDate + endingTripTime],
    };
  }

  // sort=price_DESC,departureTime_ASC
  if (query.sort) {
    const params = query.sort.split(",");
    sortFilter = params.map(param => param.split("_"));
  }

  try {
    return await flightRepository.getAllFlights(customFilter, sortFilter);
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlight(id) {
  try {
    return await flightRepository.get(id);
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The flight you requested is not present",
        StatusCodes.NOT_FOUND
      );
    }

    throw new AppError(
      "Cannot fetch data of the requested flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateSeats(data) {
  try {
    return await flightRepository.updateRemainingSeats(
      data.flightId,
      data.seats,
      data.dec
    );
  } catch (error) {
    throw new AppError(
      "Cannot update data of the flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
};
