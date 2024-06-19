import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCar } from "./car.interface";
import Car from "./car.model";

export const createCarService = async (payload: TCar) => {
  const newCar = await Car.create(payload);

  return newCar;
};

export const getAllCarsService = async () => {
  const cars = await Car.find();

  return cars;
};

export const getCarByIdService = async (carId: string) => {
  const car = await Car.findById(carId);

  return car;
};

export const updateCarService = async (carId: string, payload: TCar) => {
  const updatedCar = await Car.findByIdAndUpdate(carId, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedCar) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found");
  }

  return updatedCar;
};

export const deleteCarService = async (carId: string) => {
  const deletedCar = await Car.findByIdAndUpdate(
    carId,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  if (!deletedCar) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found");
  }

  return deletedCar;
};
