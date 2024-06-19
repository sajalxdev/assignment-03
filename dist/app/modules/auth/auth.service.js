"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinUserService = exports.signupUserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const signupUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield user_model_1.User.create(payload);
    return newUser;
});
exports.signupUserService = signupUserService;
const signinUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email }).select("+password");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid email or password");
    }
    const isPasswordMatch = yield user_model_1.User.comparePassword(payload.password, user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid email or password");
    }
    user.password = "";
    const jwtPayload = {
        userId: user._id,
        role: user.role,
    };
    const token = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_secret, config_1.default.jwt_expires_in);
    return { user, token };
});
exports.signinUserService = signinUserService;
