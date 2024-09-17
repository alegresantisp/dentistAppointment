import { Router } from "express";
import { getAppointments, getAppointmentId, scheduleAppointment, cancelAppointment } from "../controllers/appointmentController";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", getAppointments);
appointmentsRouter.get("/:id", getAppointmentId);
appointmentsRouter.post("/schedule", scheduleAppointment);
appointmentsRouter.put("/cancel/:id", cancelAppointment);

export default appointmentsRouter;  
