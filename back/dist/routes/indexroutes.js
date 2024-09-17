"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersRoutes_1 = __importDefault(require("./usersRoutes"));
const appointmentsRoutes_1 = __importDefault(require("./appointmentsRoutes"));
const express_1 = require("express");
const indexRouter = (0, express_1.Router)();
indexRouter.use("/users", usersRoutes_1.default);
indexRouter.use("/appointments", appointmentsRoutes_1.default);
exports.default = indexRouter;
