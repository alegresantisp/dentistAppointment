import usersRoutes from "./usersRoutes";
import appointmentsRoutes from "./appointmentsRoutes";
import { Router } from "express";

const indexRouter: Router = Router();

indexRouter.use("/users", usersRoutes);
indexRouter.use("/appointments", appointmentsRoutes);

export default indexRouter;