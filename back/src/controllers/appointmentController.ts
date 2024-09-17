import { Request, Response } from "express";
import { getAppointmentsService, getAppointmentServiceId, scheduleAppointmentService, cancelAppointmentService } from "../services/appointmentService";
import AppointmentDto from "../dto/AppointmentDto";
import { getUserByIdService } from "../services/userService";


export const getAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await getAppointmentsService();
        if (appointments.length > 0) {
            res.status(200).json(appointments);
        } else {
            res.status(404).json({ message: 'No se encontraron turnos' });
        }
    } catch (error) {
        console.error('Error al encontrar turnos:', error);
        res.status(500).json({ message: 'Error en el servicio' });
    }
};

export const getAppointmentId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const appointment = await getAppointmentServiceId(Number(id));
        if (appointment) {
            res.status(200).json(appointment);
        } else {
            res.status(404).send(`Turno con id ${id} no encontrado`);
        }
    } catch (error) {
        console.error(`Error al encontrar turno con id ${id}:`, error);
        res.status(500).json({ message: 'Error en el servicio' });
    }
};

export const scheduleAppointment = async (req: Request, res: Response) => {
    const appointmentData:AppointmentDto = req.body;

    console.log('Received appointmentData:', appointmentData); 

    if (!appointmentData.date || !appointmentData.time || !appointmentData.userId) {
        return res.status(400).json({ message: 'Faltan datos requeridos para agendar el turno' });
    }

    try {

        const user = await getUserByIdService(appointmentData.userId);
        if (!user) {
            return res.status(400).json({ message: 'El usuario especificado no existe' });
        } else{
            const newAppointment = await scheduleAppointmentService(appointmentData);
            res.status(201).json(newAppointment);
        }

        
    } catch (error) {
        console.error('Error al agendar un turno:', error);
        res.status(500).json({ message: 'Error en el servicio' });
    }
};

export const cancelAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

        const appointment = await getAppointmentServiceId(Number(id));
        if (!appointment) {
            return res.status(404).json({ message: 'El turno especificado no fue encontrado' });
        }

        await cancelAppointmentService(Number(id));
        res.status(200).json({ message: `Turno con id ${id} ha sido cancelado` });

    } catch (error) {
        console.error(`Error al cancelar turno con id ${id}:`, error);
        res.status(500).json({ message: 'Error en el servicio' });
    }
};
