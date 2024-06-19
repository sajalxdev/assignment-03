import mongoose from "mongoose";

export type TUserRole = "admin" | "user";

export interface TUser {
  name: string;
  email: string;
  role: TUserRole;
  password: string;
  phone: string;
  address: string;
}

export interface UserModel extends mongoose.Model<TUser> {
  comparePassword: (
    loginPassword: string,
    hashedPassword: string
  ) => Promise<boolean>;
}
