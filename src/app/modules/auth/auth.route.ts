import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { signinUser, signupUser } from "./auth.controller";
import {
  signInValidationSchema,
  signUpValidationSchema,
} from "./auth.validation";

const authRouter = express.Router();

authRouter.post("/signup", validateRequest(signUpValidationSchema), signupUser);

authRouter.post("/signin", validateRequest(signInValidationSchema), signinUser);

export default authRouter;
