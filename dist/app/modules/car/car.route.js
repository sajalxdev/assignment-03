"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_controller_1 = require("../booking/booking.controller");
const booking_validation_1 = require("../booking/booking.validation");
const car_controller_1 = require("./car.controller");
const car_validation_1 = require("./car.validation");
const carRouter = express_1.default.Router();
carRouter.put("/return", (0, auth_1.default)("admin"), (0, validateRequest_1.default)(booking_validation_1.returnCarSchema), booking_controller_1.returnCar);
carRouter
    .route("/")
    .post((0, auth_1.default)("admin"), (0, validateRequest_1.default)(car_validation_1.createCarValidationSchema), car_controller_1.createCar)
    .get(car_controller_1.getAllCars);
carRouter
    .route("/:carId")
    .get(car_controller_1.getCarById)
    .put((0, auth_1.default)("admin"), (0, validateRequest_1.default)(car_validation_1.updateCarValidationSchema), car_controller_1.updateCar)
    .delete((0, auth_1.default)("admin"), car_controller_1.deleteCar);
exports.default = carRouter;
