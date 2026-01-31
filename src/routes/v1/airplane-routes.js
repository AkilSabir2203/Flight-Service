import express from "express";
import { AirplaneController } from "../../controllers/index.js";
import { AirplaneMiddlewares } from "../../middlewares/index.js";

const router = express.Router();

// /api/v1/airplanes/ -> POST
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest,
  AirplaneController.createAirplane
);

// /api/v1/airplanes/ -> GET
router.get("/", AirplaneController.getAirplanes);

// /api/v1/airplanes/:id -> GET
router.get("/:id", AirplaneController.getAirplane);

// /api/v1/airplanes/:id -> DELETE
router.delete("/:id", AirplaneController.destroyAirplane);

// /api/v1/airplanes/:id -> PATCH
router.patch(
  "/:id",
  AirplaneMiddlewares.validateUpdateRequest,
  AirplaneController.updateAirplane
);

export default router;
