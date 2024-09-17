import { Router } from "express";
import { createUser, getUser, getUserById, loginUser } from "../controllers/userController";

const usersRouter: Router = Router();

usersRouter.get("/", getUser);
usersRouter.get("/:id", getUserById);
usersRouter.post("/register", createUser);
usersRouter.post("/login", loginUser);

export default usersRouter;
