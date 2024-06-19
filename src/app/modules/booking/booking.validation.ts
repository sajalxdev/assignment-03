import { z } from "zod";

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  }
);

export const carBookingSchema = z.object({
  body: z.object({
    carId: z.string({
      required_error: "CarId is required",
    }),
    date: z.string({
      required_error: "Date is required",
    }),
    startTime: timeStringSchema,
  }),
});

export const returnCarSchema = z.object({
  body: z.object({
    bookingId: z.string({
      required_error: "BookingId is required",
    }),
    endTime: timeStringSchema,
  }),
});
