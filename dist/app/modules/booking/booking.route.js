"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const bookingRouter = express_1.default.Router();
bookingRouter
    .route("/")
    .get((0, auth_1.default)("admin"), booking_controller_1.getAllBookings)
    .post((0, auth_1.default)("user"), (0, validateRequest_1.default)(booking_validation_1.carBookingSchema), booking_controller_1.bookACar);
bookingRouter.get("/my-bookings", (0, auth_1.default)("user"), booking_controller_1.getUserBookings);
exports.default = bookingRouter;
