"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", userController_1.getUser);
usersRouter.get("/:id", userController_1.getUserById);
usersRouter.post("/register", userController_1.createUser);
usersRouter.post("/login", userController_1.loginUser);
exports.default = usersRouter;
