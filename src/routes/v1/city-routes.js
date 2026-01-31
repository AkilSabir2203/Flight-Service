import express from "express";
import { CityController } from "../../controllers/index.js";
import { CityMiddlewares } from "../../middlewares/index.js";

const router = express.Router();

// /api/v1/cities -> POST
router.post(
  "/",
  CityMiddlewares.validateCreateRequest,
  CityController.createCity
);

// /api/v1/cities -> GET
router.get("/", CityController.getCities);

// /api/v1/cities/:id -> GET
router.get("/:id", CityController.getCity);

// /api/v1/cities/:id -> DELETE
router.delete("/:id", CityController.destroyCity);

// /api/v1/cities/:id -> PATCH
router.patch(
  "/:id",
  CityMiddlewares.validateUpdateRequest,
  CityController.updateCity
);

export default router;
