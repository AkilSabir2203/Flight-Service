import express from "express";
import { AirportController } from "../../controllers/index.js";
import { AirportMiddlewares } from "../../middlewares/index.js";

const router = express.Router();

// /api/v1/airports POST
router.post(
  "/",
  AirportMiddlewares.validateCreateRequest,
  AirportController.createAirport
);

// /api/v1/airports GET
router.get("/", AirportController.getAirports);

// /api/v1/airports/:id GET
router.get("/:id", AirportController.getAirport);

// /api/v1/airports/:id DELETE
router.delete("/:id", AirportController.destroyAirport);

export default router;
