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
exports.returnCarService = exports.getUserBookingsService = exports.getAllBookingsService = exports.bookACarService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const car_model_1 = __importDefault(require("../car/car.model"));
const booking_model_1 = __importDefault(require("./booking.model"));
const bookACarService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield car_model_1.default.findById(payload.car);
    if (!car) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car not found");
    }
    if (car.status === "unavailable") {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Car is not available for booking");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newBooking = yield booking_model_1.default.create([payload], { session });
        car.status = "unavailable";
        yield car.save({ session });
        yield session.commitTransaction();
        yield session.endSession();
        return newBooking;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message);
    }
});
exports.bookACarService = bookACarService;
const getAllBookingsService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ carId, date, }) {
    const query = {};
    if (carId) {
        query["car"] = new mongoose_1.default.Types.ObjectId(carId);
    }
    if (date) {
        query["date"] = {
            $gte: new Date(`${date}T00:00:00.000Z`),
            $lte: new Date(`${date}T23:59:59.999Z`),
        };
    }
    const bookings = yield booking_model_1.default.find(query);
    return bookings;
});
exports.getAllBookingsService = getAllBookingsService;
const getUserBookingsService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.default.find({ user: userId });
    return bookings;
});
exports.getUserBookingsService = getUserBookingsService;
const returnCarService = (bookingId, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.default.findById(bookingId);
    if (!booking) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Booking not found");
    }
    if (booking.endTime) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Car already returned");
    }
    const car = booking.car;
    const startTime = new Date(`1970-01-01T${booking.startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    if (end < startTime) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "End time cannot be less than start time");
    }
    const hours = (end.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    const totalCost = Math.trunc(hours * car.pricePerHour);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        booking.endTime = endTime;
        booking.totalCost = totalCost;
        yield booking.save({ session });
        car.status = "available";
        yield car.save({ session });
        yield session.commitTransaction();
        yield session.endSession();
        return booking;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message);
    }
});
exports.returnCarService = returnCarService;
