import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/app-error.js";
import { ErrorResponse } from "../utils/common/index.js";

export function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Something went wrong while creating City.";
    ErrorResponse.error = new AppError(
      ["name is not found in request body."],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

export function validateUpdateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Something went wrong while updating City.";
    ErrorResponse.error = new AppError(
      ["name is not found in request body."],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
