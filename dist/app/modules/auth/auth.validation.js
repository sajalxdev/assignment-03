"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInValidationSchema = exports.signUpValidationSchema = void 0;
const zod_1 = require("zod");
exports.signUpValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        email: zod_1.z
            .string({ required_error: "Email is required" })
            .email({ message: "Invalid email" }),
        password: zod_1.z.string({ required_error: "Password is required" }).min(8, {
            message: "Password must be at least 8 characters long",
        }),
        phone: zod_1.z.string({ required_error: "Phone is required" }),
        address: zod_1.z.string({ required_error: "Address is required" }),
        role: zod_1.z.string({ required_error: "Role is required" }).optional(),
    }),
});
exports.signInValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: "Email is required" })
            .email({ message: "Invalid email" }),
        password: zod_1.z.string({ required_error: "Password is required" }),
    }),
});
