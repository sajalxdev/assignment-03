import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { verifyToken } from "../modules/auth/auth.utils";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

const protect = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized ");
    }

    const decoded = (await verifyToken(
      token,
      config.jwt_secret as string
    )) as JwtPayload;

    const { userId, role, exp } = decoded;

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    if ((exp as number) * 1000 < Date.now()) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Token expired");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not allowed to access this route"
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default protect;
