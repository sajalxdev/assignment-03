import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { TUserRole } from "../user/user.interface";

export const createToken = (
  jwtPayload: { userId: mongoose.Types.ObjectId; role: TUserRole },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
