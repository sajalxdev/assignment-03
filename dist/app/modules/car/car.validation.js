"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCarValidationSchema = exports.createCarValidationSchema = void 0;
const zod_1 = require("zod");
exports.createCarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        description: zod_1.z.string({ required_error: "Description is required" }),
        color: zod_1.z.string({ required_error: "Color is required" }),
        isElectric: zod_1.z.boolean({ required_error: "isElectric is required" }),
        features: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "Features must have at least 1 item" }),
        pricePerHour: zod_1.z
            .number({ required_error: "Price per hour is required" })
            .positive({ message: "Price per hour must be positive" }),
    }),
});
// optional schema
exports.updateCarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }).optional(),
        description: zod_1.z
            .string({ required_error: "Description is required" })
            .optional(),
        color: zod_1.z.string({ required_error: "Color is required" }).optional(),
        isElectric: zod_1.z
            .boolean({ required_error: "isElectric is required" })
            .optional(),
        features: zod_1.z
            .array(zod_1.z.string())
            .nonempty({ message: "Features must have at least 1 item" })
            .optional(),
        pricePerHour: zod_1.z
            .number({ required_error: "Price per hour is required" })
            .positive({ message: "Price per hour must be positive" })
            .optional(),
    }),
});
