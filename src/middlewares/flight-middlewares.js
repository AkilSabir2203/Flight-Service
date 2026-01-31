import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/errors/app-error.js";

export function validateCreateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    return sendError(res, "flightNumber not found in request body");
  }
  if (!req.body.airplaneId) {
    return sendError(res, "airplaneId not found in request body");
  }
  if (!req.body.departureAirportId) {
    return sendError(res, "departureAirportId not found in request body");
  }
  if (!req.body.arrivalAirportId) {
    return sendError(res, "arrivalAirportId not found in request body");
  }
  if (!req.body.arrivalTime) {
    return sendError(res, "arrivalTime not found in request body");
  }
  if (!req.body.departureTime) {
    return sendError(res, "departureTime not found in request body");
  }
  if (!req.body.price) {
    return sendError(res, "price not found in request body");
  }
  if (!req.body.totalSeats) {
    return sendError(res, "totalSeats not found in request body");
  }

  next();
}

export function validateUpdateSeatsRequest(req, res, next) {
  if (!req.body.seats) {
    return sendError(res, "seats not found in request body");
  }
  next();
}

// 🔥 helper to avoid repeating same code
function sendError(res, message) {
  ErrorResponse.message = "Something went wrong while processing flight request";
  ErrorResponse.error = new AppError([message], StatusCodes.BAD_REQUEST);
  return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
}
