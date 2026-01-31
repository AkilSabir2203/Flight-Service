import { StatusCodes } from "http-status-codes";
import { AirportService } from "../services/index.js";
import { SuccessResponse, ErrorResponse } from "../utils/common/index.js";

/**
 * POST : /airports
 */
export async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });

    SuccessResponse.data = airport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
}

/**
 * GET : /airports
 */
export async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();

    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching airports";
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
}

/**
 * GET : /airports/:id
 */
export async function getAirport(req, res) {
  try {
    const airport = await AirportService.getAirport(req.params.id);

    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while fetching airport";
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
}

/**
 * DELETE : /airports/:id
 */
export async function destroyAirport(req, res) {
  try {
    const response = await AirportService.destroyAirport(req.params.id);

    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while deleting airport";
    ErrorResponse.error = error;
    return res.status(error.statusCode || 500).json(ErrorResponse);
  }
}
