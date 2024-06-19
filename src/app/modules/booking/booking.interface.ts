import mongoose from "mongoose";

export interface TBooking {
  date: Date;
  user: mongoose.Types.ObjectId;
  car: mongoose.Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
}

export interface TBookingFields {
  date: Date;
  user: string;
  car: string;
  startTime: string;
}

export interface TBookingParams {
  carId?: string;
  date?: string;
}

export interface TBookingQuery {
  car?: mongoose.Types.ObjectId;
  date?: {
    $gte: Date;
    $lte: Date;
  };
}
