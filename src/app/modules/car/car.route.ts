import express from "express";
import protect from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { returnCar } from "../booking/booking.controller";
import { returnCarSchema } from "../booking/booking.validation";
import {
  createCar,
  deleteCar,
  getAllCars,
  getCarById,
  updateCar,
} from "./car.controller";
import {
  createCarValidationSchema,
  updateCarValidationSchema,
} from "./car.validation";

const carRouter = express.Router();

carRouter.put(
  "/return",
  protect("admin"),
  validateRequest(returnCarSchema),
  returnCar
);

carRouter
  .route("/")
  .post(protect("admin"), validateRequest(createCarValidationSchema), createCar)
  .get(getAllCars);

carRouter
  .route("/:carId")
  .get(getCarById)
  .put(protect("admin"), validateRequest(updateCarValidationSchema), updateCar)
  .delete(protect("admin"), deleteCar);

export default carRouter;
