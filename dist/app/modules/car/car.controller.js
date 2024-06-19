"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.updateCar = exports.getCarById = exports.getAllCars = exports.createCar = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const car_service_1 = require("./car.service");
exports.createCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCar = yield (0, car_service_1.createCarService)(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Car created successfully",
        data: newCar,
    });
}));
exports.getAllCars = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield (0, car_service_1.getAllCarsService)();
    if (cars.length === 0) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 404,
            message: "No data found",
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Cars retrieved successfully",
        data: cars,
    });
}));
exports.getCarById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield (0, car_service_1.getCarByIdService)(req.params.carId);
    if (!car) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 404,
            message: "Car not found",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "A Car retrieved successfully",
        data: car,
    });
}));
exports.updateCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCar = yield (0, car_service_1.updateCarService)(req.params.carId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Car updated successfully",
        data: updatedCar,
    });
}));
exports.deleteCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCar = yield (0, car_service_1.deleteCarService)(req.params.carId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Car deleted successfully",
        data: deletedCar,
    });
}));
