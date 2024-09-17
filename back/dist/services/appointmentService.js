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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentService = exports.scheduleAppointmentService = exports.getAppointmentServiceId = exports.getAppointmentsService = void 0;
const data_source_1 = require("../config/data-source");
const AppointmentDto_1 = require("../dto/AppointmentDto");
const getAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield data_source_1.AppointmentModel.find();
        return appointment;
    }
    catch (error) {
        console.error('Error al encontrar usuarios:', error);
        throw new Error('Error en el servicio');
    }
});
exports.getAppointmentsService = getAppointmentsService;
const getAppointmentServiceId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield data_source_1.AppointmentModel.findOne({
            where: { id },
            relations: ["user"]
        });
        return appointment || null;
    }
    catch (error) {
        console.error(`Error al encontrar usuario con id ${id}:`, error);
        throw new Error('Error en el servicio');
    }
});
exports.getAppointmentServiceId = getAppointmentServiceId;
const scheduleAppointmentService = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //crear nuevo appointment
        const newAppointment = data_source_1.AppointmentModel.create({
            date: new Date(appointmentData.date),
            time: appointmentData.time,
            userId: appointmentData.userId,
            status: AppointmentDto_1.AppointmentStatus.Active,
        });
        yield data_source_1.AppointmentModel.save(newAppointment);
        return newAppointment;
    }
    catch (error) {
        console.error('Error al agendar turno:', error);
        throw new Error('Error en el servidor');
    }
});
exports.scheduleAppointmentService = scheduleAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield data_source_1.AppointmentModel.findOneBy({ id });
        if (!appointment) {
            throw new Error(`Turno con id ${id}, no fue encontrado.`);
        }
        appointment.status = AppointmentDto_1.AppointmentStatus.Cancelled;
        yield data_source_1.AppointmentModel.save(appointment);
    }
    catch (error) {
        console.error(`Error al cancelar turno con id: ${id}:`, error);
        throw new Error('Error en el servidor');
    }
});
exports.cancelAppointmentService = cancelAppointmentService;
