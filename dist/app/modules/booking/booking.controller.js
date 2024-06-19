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
exports.returnCar = exports.getUserBookings = exports.getAllBookings = exports.bookACar = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_service_1 = require("./booking.service");
exports.bookACar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId, date, startTime } = req.body;
    const newBooking = yield (0, booking_service_1.bookACarService)({
        car: carId,
        date: new Date(date),
        startTime,
        user: req.user.userId,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Car booked successfully",
        data: newBooking,
    });
}));
exports.getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carId, date } = req.query;
    const bookings = yield (0, booking_service_1.getAllBookingsService)({
        carId: carId,
        date: date,
    });
    if (!bookings.length) {
        (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 404,
            message: "No data found",
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "All bookings fetched successfully",
        data: bookings,
    });
}));
exports.getUserBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const bookings = yield (0, booking_service_1.getUserBookingsService)(userId);
    if (!bookings) {
        (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 404,
            message: "No data found",
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User bookings fetched successfully",
        data: bookings,
    });
}));
exports.returnCar = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId, endTime } = req.body;
    const booking = yield (0, booking_service_1.returnCarService)(bookingId, endTime);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Car returned successfully",
        data: booking,
    });
}));
