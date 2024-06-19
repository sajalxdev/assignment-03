import express from "express";
import authRouter from "../modules/auth/auth.route";
import bookingRouter from "../modules/booking/booking.route";
import carRouter from "../modules/car/car.route";
import { TRoute } from "./route.interface";

const router = express.Router();

const routes: Array<TRoute> = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/cars",
    route: carRouter,
  },
  {
    path: "/bookings",
    route: bookingRouter,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
