import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { signinUserService, signupUserService } from "./auth.service";

export const signupUser = catchAsync(async (req, res) => {
  const result = await signupUserService(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User signed up successfully",
    data: result,
  });
});

export const signinUser = catchAsync(async (req, res) => {
  const { user, token } = await signinUserService(req.body);

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User signed in successfully",
    data: user,
    token: token,
  });
});
