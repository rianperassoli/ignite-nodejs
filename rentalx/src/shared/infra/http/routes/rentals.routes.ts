import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/createRental/devolutionRental/DevolutionRentalController";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticate";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post("/", ensureAuthenticate, createRentalController.handle);
rentalsRoutes.post(
  "/devolution/:id",
  ensureAuthenticate,
  devolutionRentalController.handle
);

export { rentalsRoutes };
