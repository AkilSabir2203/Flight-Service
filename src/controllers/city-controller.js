import { StatusCodes } from "http-status-codes";
import { CityService } from "../services/index.js";
import { SuccessResponse, ErrorResponse } from "../utils/common/index.js";

/**
 * POST: /cities
 */
export async function createCity(req, res) {
  try {
    const city = await CityService.createCity({
      name: req.body.name,
    });

    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while creating city";
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
}

/**
 * GET: /cities
 */
export async function getCities(req, res) {
  try {
    const cities = await CityService.getCities();

    SuccessResponse.data = cities;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message =
      "Something went wrong while fetching cities data";
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
}

/**
 * GET: /cities/:id
 */
export async function getCity(req, res) {
  try {
    const city = await CityService.getCity(req.params.id);

    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching city data";
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
}

/**
 * DELETE: /cities/:id
 */
export async function destroyCity(req, res) {
  try {
    const city = await CityService.destroyCity(req.params.id);

    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while deleting the city";
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
}

/**
 * PATCH: /cities/:id
 */
export async function updateCity(req, res) {
  try {
    const city = await CityService.updateCity(req.params.id, req.body);

    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while updating city";
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
}
