"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnCarSchema = exports.carBookingSchema = void 0;
const zod_1 = require("zod");
const timeStringSchema = zod_1.z.string().refine((time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
}, {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
});
exports.carBookingSchema = zod_1.z.object({
    body: zod_1.z.object({
        carId: zod_1.z.string({
            required_error: "CarId is required",
        }),
        date: zod_1.z.string({
            required_error: "Date is required",
        }),
        startTime: timeStringSchema,
    }),
});
exports.returnCarSchema = zod_1.z.object({
    body: zod_1.z.object({
        bookingId: zod_1.z.string({
            required_error: "BookingId is required",
        }),
        endTime: timeStringSchema,
    }),
});
