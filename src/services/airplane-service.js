import { StatusCodes } from "http-status-codes";
import { AirplaneRepository } from "../repositories/index.js";
import AppError from "../utils/errors/app-error.js";

const airplaneRepository = new AirplaneRepository();

export async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            const explanation = error.errors.map(e => e.message);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(
            "Cannot create a new airplane object.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

export async function getAirplanes() {
    try {
        return await airplaneRepository.getAll();
    } catch (error) {
        throw new AppError(
            "Cannot fetch data of all the airplanes.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

export async function getAirplane(id) {
    try {
        return await airplaneRepository.get(id);
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError(
                "The airplane you requested not found.",
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError(
            "Cannot fetch data of the airplane.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

export async function destroyAirplane(id) {
    try {
        return await airplaneRepository.destroy(id);
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError(
                "The airplane you requested to delete not found.",
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError(
            "Cannot delete the airplane.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

export async function updateAirplane(id, data) {
    try {
        return await airplaneRepository.update(id, data);
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError(
                "Airplane to update not found",
                StatusCodes.NOT_FOUND
            );
        }

        if (error.name === "SequelizeValidationError") {
            const explanation = error.errors.map(e => e.message);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError(
            "Cannot update the airplane object.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
