import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  bookACarService,
  getAllBookingsService,
  getUserBookingsService,
  returnCarService,
} from "./booking.service";

export const bookACar = catchAsync(async (req, res) => {
  const { carId, date, startTime } = req.body;

  const newBooking = await bookACarService({
    car: carId,
    date: new Date(date),
    startTime,
    user: req.user.userId,
  });

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Car booked successfully",
    data: newBooking,
  });
});

export const getAllBookings = catchAsync(async (req, res) => {
  const { carId, date } = req.query;

  const bookings = await getAllBookingsService({
    carId: carId as string,
    date: date as string,
  });

  if (!bookings.length) {
    sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "No data found",
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All bookings fetched successfully",
    data: bookings,
  });
});

export const getUserBookings = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  const bookings = await getUserBookingsService(userId);

  if (!bookings) {
    sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "No data found",
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User bookings fetched successfully",
    data: bookings,
  });
});

export const returnCar = catchAsync(async (req, res) => {
  const { bookingId, endTime } = req.body;

  const booking = await returnCarService(bookingId, endTime);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Car returned successfully",
    data: booking,
  });
});
