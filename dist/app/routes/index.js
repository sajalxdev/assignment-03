"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const booking_route_1 = __importDefault(require("../modules/booking/booking.route"));
const car_route_1 = __importDefault(require("../modules/car/car.route"));
const router = express_1.default.Router();
const routes = [
    {
        path: "/auth",
        route: auth_route_1.default,
    },
    {
        path: "/cars",
        route: car_route_1.default,
    },
    {
        path: "/bookings",
        route: booking_route_1.default,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
