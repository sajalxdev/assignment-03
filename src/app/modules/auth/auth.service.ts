import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";

export const signupUserService = async (payload: TUser) => {
  const newUser = await User.create(payload);

  return newUser;
};

export const signinUserService = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const isPasswordMatch = await User.comparePassword(
    payload.password,
    user.password
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  user.password = "";

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_expires_in as string
  );

  return { user, token };
};
