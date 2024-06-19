import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import {
  createCarService,
  deleteCarService,
  getAllCarsService,
  getCarByIdService,
  updateCarService,
} from "./car.service";

export const createCar = catchAsync(async (req, res) => {
  const newCar = await createCarService(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Car created successfully",
    data: newCar,
  });
});

export const getAllCars = catchAsync(async (req, res) => {
  const cars = await getAllCarsService();

  if (cars.length === 0) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "No data found",
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Cars retrieved successfully",
    data: cars,
  });
});

export const getCarById = catchAsync(async (req, res) => {
  const car = await getCarByIdService(req.params.carId);

  if (!car) {
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "Car not found",
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "A Car retrieved successfully",
    data: car,
  });
});

export const updateCar = catchAsync(async (req, res) => {
  const updatedCar = await updateCarService(req.params.carId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Car updated successfully",
    data: updatedCar,
  });
});

export const deleteCar = catchAsync(async (req, res) => {
  const deletedCar = await deleteCarService(req.params.carId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Car deleted successfully",
    data: deletedCar,
  });
});
