import bcrypt from "bcrypt";
import mongoose from "mongoose";
import config from "../../config";
import { TUser, UserModel } from "./user.interface";

const userSchema = new mongoose.Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";

  next();
});

userSchema.statics.comparePassword = async function (
  loginPassword,
  hashedPassword
) {
  return await bcrypt.compare(loginPassword, hashedPassword);
};

export const User = mongoose.model<TUser, UserModel>("User", userSchema);
