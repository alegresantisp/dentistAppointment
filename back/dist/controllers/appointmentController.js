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
exports.cancelAppointment = exports.scheduleAppointment = exports.getAppointmentId = exports.getAppointments = void 0;
const appointmentService_1 = require("../services/appointmentService");
const userService_1 = require("../services/userService");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentService_1.getAppointmentsService)();
        if (appointments.length > 0) {
            res.status(200).json(appointments);
        }
        else {
            res.status(404).json({ message: 'No se encontraron turnos' });
        }
    }
    catch (error) {
        console.error('Error al encontrar turnos:', error);
        res.status(500).json({ message: 'Error en el servicio' });
    }
});
exports.getAppointments = getAppointments;
const getAppointmentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const appointment = yield (0, appointmentService_1.getAppointmentServiceId)(Number(id));
        if (appointment) {
            res.status(200).json(appointment);
        }
        else {
            res.status(404).send(`Turno con id ${id} no encontrado`);
        }
    }
    catch (error) {
        console.error(`Error al encontrar turno con id ${id}:`, error);
        res.status(500).json({ message: 'Error en el servicio' });
    }
});
exports.getAppointmentId = getAppointmentId;
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentData = req.body;
    console.log('Received appointmentData:', appointmentData);
    if (!appointmentData.date || !appointmentData.time || !appointmentData.userId) {
        return res.status(400).json({ message: 'Faltan datos requeridos para agendar el turno' });
    }
    try {
        const user = yield (0, userService_1.getUserByIdService)(appointmentData.userId);
        if (!user) {
            return res.status(400).json({ message: 'El usuario especificado no existe' });
        }
        else {
            const newAppointment = yield (0, appointmentService_1.scheduleAppointmentService)(appointmentData);
            res.status(201).json(newAppointment);
        }
    }
    catch (error) {
        console.error('Error al agendar un turno:', error);
        res.status(500).json({ message: 'Error en el servicio' });
    }
});
exports.scheduleAppointment = scheduleAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const appointment = yield (0, appointmentService_1.getAppointmentServiceId)(Number(id));
        if (!appointment) {
            return res.status(404).json({ message: 'El turno especificado no fue encontrado' });
        }
        yield (0, appointmentService_1.cancelAppointmentService)(Number(id));
        res.status(200).json({ message: `Turno con id ${id} ha sido cancelado` });
    }
    catch (error) {
        console.error(`Error al cancelar turno con id ${id}:`, error);
        res.status(500).json({ message: 'Error en el servicio' });
    }
});
exports.cancelAppointment = cancelAppointment;
