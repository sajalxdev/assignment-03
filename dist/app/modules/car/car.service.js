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
exports.deleteCarService = exports.updateCarService = exports.getCarByIdService = exports.getAllCarsService = exports.createCarService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const car_model_1 = __importDefault(require("./car.model"));
const createCarService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newCar = yield car_model_1.default.create(payload);
    return newCar;
});
exports.createCarService = createCarService;
const getAllCarsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield car_model_1.default.find();
    return cars;
});
exports.getAllCarsService = getAllCarsService;
const getCarByIdService = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield car_model_1.default.findById(carId);
    return car;
});
exports.getCarByIdService = getCarByIdService;
const updateCarService = (carId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCar = yield car_model_1.default.findByIdAndUpdate(carId, payload, {
        new: true,
        runValidators: true,
    });
    if (!updatedCar) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car not found");
    }
    return updatedCar;
});
exports.updateCarService = updateCarService;
const deleteCarService = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCar = yield car_model_1.default.findByIdAndUpdate(carId, {
        isDeleted: true,
    }, {
        new: true,
    });
    if (!deletedCar) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car not found");
    }
    return deletedCar;
});
exports.deleteCarService = deleteCarService;
