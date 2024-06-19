import mongoose from "mongoose";
import { TCar } from "./car.interface";

const carSchema = new mongoose.Schema<TCar>(
  {
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
  },
  {
    timestamps: true,
  }
);

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

const Car = mongoose.model<TCar>("Car", carSchema);

export default Car;
