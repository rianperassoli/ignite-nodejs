import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticate";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post("/", ensureAuthenticate, createRentalController.handle);

export { rentalsRoutes };
