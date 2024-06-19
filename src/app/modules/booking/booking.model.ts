import mongoose from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new mongoose.Schema<TBooking>(
  {
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

bookingSchema.pre("find", function (next) {
  this.populate("user").populate("car");
  next();
});

bookingSchema.pre("findOne", function (next) {
  this.populate("user").populate("car");
  next();
});

const Booking = mongoose.model<TBooking>("Booking", bookingSchema);

export default Booking;
