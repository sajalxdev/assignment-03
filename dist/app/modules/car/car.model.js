"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const carSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    isElectric: {
        type: Boolean,
        required: true,
    },
    status: {
        type: String,
        enum: ["available", "unavailable"],
        default: "available",
    },
    features: {
        type: [String],
        required: true,
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
carSchema.pre("find", function (next) {
    this.find({ isDeleted: false });
    next();
});
carSchema.pre("findOne", function (next) {
    this.findOne({ isDeleted: false });
    next();
});
carSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isDeleted: false } });
    next();
});
const Car = mongoose_1.default.model("Car", carSchema);
exports.default = Car;
