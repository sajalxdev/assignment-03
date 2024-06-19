import httpStatus from "http-status";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import Car from "../car/car.model";
import {
  TBookingFields,
  TBookingParams,
  TBookingQuery,
} from "./booking.interface";
import Booking from "./booking.model";

export const bookACarService = async (payload: TBookingFields) => {
  const car = await Car.findById(payload.car);

  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found");
  }

  if (car.status === "unavailable") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Car is not available for booking"
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newBooking = await Booking.create([payload], { session });

    car.status = "unavailable";
    await car.save({ session });

    await session.commitTransaction();
    await session.endSession();

    return newBooking;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getAllBookingsService = async ({
  carId,
  date,
}: TBookingParams) => {
  const query: TBookingQuery = {};

  if (carId) {
    query["car"] = new mongoose.Types.ObjectId(carId);
  }

  if (date) {
    query["date"] = {
      $gte: new Date(`${date}T00:00:00.000Z`),
      $lte: new Date(`${date}T23:59:59.999Z`),
    };
  }

  const bookings = await Booking.find(query);

  return bookings;
};

export const getUserBookingsService = async (userId: string) => {
  const bookings = await Booking.find({ user: userId });

  return bookings;
};

export const returnCarService = async (bookingId: string, endTime: string) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  if (booking.endTime) {
    throw new AppError(httpStatus.BAD_REQUEST, "Car already returned");
  }

  const car = booking.car as any;

  const startTime = new Date(`1970-01-01T${booking.startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);

  if (end < startTime) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "End time cannot be less than start time"
    );
  }

  const hours = (end.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  const totalCost = Math.trunc(hours * car.pricePerHour);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    booking.endTime = endTime;
    booking.totalCost = totalCost;

    await booking.save({ session });

    car.status = "available";
    await car.save({ session });

    await session.commitTransaction();
    await session.endSession();

    return booking;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
