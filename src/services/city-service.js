import { StatusCodes } from "http-status-codes";
import { CityRepository } from "../repositories/index.js";
import AppError from "../utils/errors/app-error.js";

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    return await cityRepository.create(data);
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const explanation = error.errors.map(e => e.message);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot create a new city object.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCities() {
  try {
    return await cityRepository.getAll();
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the cities.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCity(id) {
  try {
    return await cityRepository.get(id);
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested not found.",
        StatusCodes.NOT_FOUND
      );
    }

    throw new AppError(
      "Cannot fetch data of the city.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyCity(id) {
  try {
    return await cityRepository.destroy(id);
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested to delete not found.",
        StatusCodes.NOT_FOUND
      );
    }

    throw new AppError(
      "Cannot delete the city.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
  try {
    return await cityRepository.update(id, data);
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("City to update not found", StatusCodes.NOT_FOUND);
    }

    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      const explanation = error.errors.map(e => e.message);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot update the city object.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export {
  createCity,
  getCities,
  getCity,
  destroyCity,
  updateCity,
};
