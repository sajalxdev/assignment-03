import { z } from "zod";

export const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    description: z.string({ required_error: "Description is required" }),
    color: z.string({ required_error: "Color is required" }),
    isElectric: z.boolean({ required_error: "isElectric is required" }),
    features: z
      .array(z.string())
      .nonempty({ message: "Features must have at least 1 item" }),
    pricePerHour: z
      .number({ required_error: "Price per hour is required" })
      .positive({ message: "Price per hour must be positive" }),
  }),
});

// optional schema
export const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).optional(),
    description: z
      .string({ required_error: "Description is required" })
      .optional(),
    color: z.string({ required_error: "Color is required" }).optional(),
    isElectric: z
      .boolean({ required_error: "isElectric is required" })
      .optional(),
    features: z
      .array(z.string())
      .nonempty({ message: "Features must have at least 1 item" })
      .optional(),
    pricePerHour: z
      .number({ required_error: "Price per hour is required" })
      .positive({ message: "Price per hour must be positive" })
      .optional(),
  }),
});
