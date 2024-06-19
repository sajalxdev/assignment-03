"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const authRouter = express_1.default.Router();
authRouter.post("/signup", (0, validateRequest_1.default)(auth_validation_1.signUpValidationSchema), auth_controller_1.signupUser);
authRouter.post("/signin", (0, validateRequest_1.default)(auth_validation_1.signInValidationSchema), auth_controller_1.signinUser);
exports.default = authRouter;
