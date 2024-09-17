import { AppointmentModel } from "../config/data-source";
import AppointmentDto, { AppointmentStatus } from "../dto/AppointmentDto";
import { Appointment } from "../entities/Appointment";



export const getAppointmentsService = async (): Promise<Appointment[]> => {
    try {
        const appointment : Appointment[] = await AppointmentModel.find();
        return appointment;
    } catch (error) {
        console.error('Error al encontrar usuarios:', error);
        throw new Error('Error en el servicio');
    }
};

export const getAppointmentServiceId = async (id: number): Promise<Appointment | null> => {
    try {
        const appointment = await AppointmentModel.findOne({  
            where: { id },
            relations: ["user"]});
            
        return appointment || null;
    } catch (error) {
        console.error(`Error al encontrar usuario con id ${id}:`, error);
        throw new Error('Error en el servicio');
    }
};

export const scheduleAppointmentService = async (appointmentData: AppointmentDto): Promise<Appointment> => {
    try {

        //crear nuevo appointment
            const newAppointment = AppointmentModel.create({
            date: new Date(appointmentData.date),
            time: appointmentData.time,
            userId: appointmentData.userId,
            status: AppointmentStatus.Active,
            
        });

        await AppointmentModel.save(newAppointment);
        return newAppointment;
    } catch (error) {
        console.error('Error al agendar turno:', error);
        throw new Error('Error en el servidor');
    }
};

export const cancelAppointmentService = async (id: number): Promise<void> => {
    try {
        const appointment = await AppointmentModel.findOneBy({id});
        
        if (!appointment) {
            throw new Error(`Turno con id ${id}, no fue encontrado.`);
        }

        
        appointment.status = AppointmentStatus.Cancelled;
        await AppointmentModel.save(appointment);
    } catch (error) {
        console.error(`Error al cancelar turno con id: ${id}:`, error);
        throw new Error('Error en el servidor');
    }
};
