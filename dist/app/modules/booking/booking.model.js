"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    car: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Car",
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
    },
    totalCost: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
bookingSchema.pre("find", function (next) {
    this.populate("user").populate("car");
    next();
});
bookingSchema.pre("findOne", function (next) {
    this.populate("user").populate("car");
    next();
});
const Booking = mongoose_1.default.model("Booking", bookingSchema);
exports.default = Booking;
