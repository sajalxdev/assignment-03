import express from "express";
import protect from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  bookACar,
  getAllBookings,
  getUserBookings,
} from "./booking.controller";
import { carBookingSchema } from "./booking.validation";

const bookingRouter = express.Router();

bookingRouter
  .route("/")
  .get(protect("admin"), getAllBookings)
  .post(protect("user"), validateRequest(carBookingSchema), bookACar);

bookingRouter.get("/my-bookings", protect("user"), getUserBookings);

export default bookingRouter;
